package ro.boa.clinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy= InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(name = "type")
public abstract class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "type")
    protected String type;
    @OneToOne(mappedBy = "profile")
    private Account account;
}