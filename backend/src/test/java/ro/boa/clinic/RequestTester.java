package ro.boa.clinic;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Role;
import ro.boa.clinic.service.AccountService;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Component
public class RequestTester {
    @Autowired
    private AccountService accountService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Nullable
    private Account account;

    @Nullable
    private String jwtToken;

    public Account createTestAccount(Role role) {
        account = accountService.createAccount("user@example.com", "password", role);
        return account;
    }

    public String authenticateAccount() throws Exception {
        assert account != null;
        var request = post("/login").contentType(MediaType.APPLICATION_JSON)
            .with(httpBasic(account.getUsername(), "password"));
        jwtToken = mockMvc.perform(request).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        return jwtToken;
    }

    public RequestBuilder authenticatedPost(String url, Object body) throws JsonProcessingException {
        assert jwtToken != null;
        var json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(body);

        return post(url).contentType(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken)
            .content(json);
    }
}
