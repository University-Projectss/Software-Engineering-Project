package ro.boa.clinic.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ro.boa.clinic.model.Sex;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class Seeder implements ApplicationRunner {
    private final SeederHelper seederHelper;

    @Override
    public void run(ApplicationArguments args) {
        var emmaJohnson = seederHelper.createPatientAccountAndProfile("emmajohnson@gmail.com", "Password1",
                "Emma", "Johnson", Sex.FEMALE, LocalDate.of(1985, 1, 15));
        var ethanSmith = seederHelper.createPatientAccountAndProfile("ethansmith92@gmail.com", "Password2",
                "Ethan Liam", "Smith", Sex.MALE, LocalDate.of(1992, 5, 18));
        var oliviaWilliams = seederHelper.createPatientAccountAndProfile("oliviawilliams@yahoo.com", "Password3",
                "Olivia", "Williams", Sex.FEMALE, LocalDate.of(1988, 11, 30));
        var noahDavid = seederHelper.createPatientAccountAndProfile("noahdavis@gmail.com", "Password4",
                "Noah John", "Davis", Sex.MALE, LocalDate.of(2000, 6, 8));

        seederHelper.createDoctorAccountAndProfile("sarahanderson@virtualclinic.ro", "Clinic1",
                "Sarah", "Anderson", "Cardiology");
        seederHelper.createDoctorAccountAndProfile("michaelroberts@virtualclinic.ro", "Clinic2",
                "Michael", "Roberts", "Pediatrics");
        seederHelper.createDoctorAccountAndProfile("emilydavis@virtualclinic.ro", "Clinic3",
                "Emily", "Davis", "Neurology");
        seederHelper.createDoctorAccountAndProfile("nataliebrown@virtualclinic.ro", "Clinic4",
                "Natalie", "Brown", "Cardiology");
        seederHelper.createDoctorAccountAndProfile("jamesmiller@virtualclinic.ro", "Clinic5",
                "James", "Miller", "Orthopedic Surgery");
        seederHelper.createDoctorAccountAndProfile("laurentaylor@virtualclinic.ro", "Clinic6",
                "Lauren", "Taylor", "Dermatologist");
        seederHelper.createDoctorAccountAndProfile("benjamincarter@virtualclinic.ro", "Clinic7",
                "Benjamin", "Carter", "Psychiatry");
        seederHelper.createDoctorAccountAndProfile("sophialewis@virtualclinic.ro", "Clinic8",
                "Sophia", "Lewis", "Obstetrics/Gynecology");
        seederHelper.createDoctorAccountAndProfile("davidmartinez@virtualclinic.ro", "Clinic9",
                "David", "Martinez", "Cardiology");
        seederHelper.createDoctorAccountAndProfile("ryananderson@virtualclinic.ro", "Clinic10",
                "Ryan", "Anderson", "Neurology");
        seederHelper.createDoctorAccountAndProfile("justinjohnson@virtualclinic.ro", "Clinic11",
                "Justin", "Johnson", "Dermatology");
        seederHelper.createDoctorAccountAndProfile("alexturner@virtualclinic.ro", "Clinic12",
                "Alex", "Turner", "Gastroenterology");

        seederHelper.createTicket(oliviaWilliams, "Chest Pain",
                "I experience sharp chest pain after physical activity", "Cardiology");
        seederHelper.createTicket(emmaJohnson, "Child's Persistent Cough",
                "My child has been coughing persistently for a week", "Pediatrics");
        seederHelper.createTicket(emmaJohnson, "Chronic Headaches",
                "I suffer from chronic headaches and migraines", "Neurology");
        seederHelper.createTicket(emmaJohnson, "Joint Pain and Stiffness",
                "I have been experiencing joint pain and stiffness in my knees", "Orthopedic Surgery");
        seederHelper.createTicket(oliviaWilliams, "Acne Troubles",
                "I've been struggling with persistent acne breakouts", "Dermatology");
        seederHelper.createTicket(noahDavid, "Skin Rash",
                "I have developed a rash on my arms and need assistance", "Dermatology");
        seederHelper.createTicket(oliviaWilliams, "Menstrual Irregularities",
                "I am experiencing irregularities in my menstrual cycle", "Obstetrics/Gynecology");
        seederHelper.createTicket(ethanSmith, "Anxiety and Sleep Issues",
                "I am struggling with anxiety and facing difficulties with sleep", "Psychiatry");
        seederHelper.createTicket(ethanSmith, "Digestive Discomfort",
                "I am experiencing discomfort in my stomach after eating fried potatoes", "Gastroenterology");
    }
}
