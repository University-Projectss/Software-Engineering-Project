package ro.boa.clinic.service;

import com.theokanning.openai.OpenAiHttpException;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SpecializationService {
    @Value("${openai.key}")
    String openAiKey;

    final static String SETUP_PROMPT =
        "You are a medical specialization extractor. You will receive a description of symptoms, and you will respond" +
            " only with a specialization that best matches the description.";

    final static List<ChatMessage> MODEL_SETUP_MESSAGES = List.of(
        new ChatMessage(ChatMessageRole.SYSTEM.value(), SETUP_PROMPT),
        new ChatMessage(
            ChatMessageRole.USER.value(),
            "I feel pain in my right ear. It's pulsating and hurts more when I lie down."
        ),
        new ChatMessage(ChatMessageRole.ASSISTANT.value(), "otolaryngology")
    );

    public Optional<String> detectSpecialization(String description) {
        OpenAiService service = new OpenAiService(openAiKey);

        ArrayList<ChatMessage> systemMessages = new ArrayList<>(MODEL_SETUP_MESSAGES);
        systemMessages.add(new ChatMessage(ChatMessageRole.USER.value(), description));

        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
            .model("gpt-3.5-turbo")
            .messages(systemMessages)
            .build();

        try {
            ChatCompletionResult result = service.createChatCompletion(completionRequest);
            return Optional.of(result.getChoices().getFirst().getMessage().getContent());
        } catch (OpenAiHttpException e) {
            return Optional.empty();
        }
    }
}