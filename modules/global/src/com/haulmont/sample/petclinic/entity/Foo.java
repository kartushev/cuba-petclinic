package com.haulmont.sample.petclinic.entity;

import com.haulmont.cuba.core.entity.StandardEntity;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Table(name = "PETCLINIC_FOO")
@Entity(name = "petclinic_Foo")
public class Foo extends StandardEntity {
    private static final long serialVersionUID = -7855734783247361811L;

    @Column(name = "BAR")
    private String bar;

    @Column(name = "EMAIL")
    @Email(message = "{msg://petclinic_Foo.email.validation.Email}", regexp = "[a-z]+@[a-z]+\\.com")
    @NotEmpty(message = "{msg://petclinic_Foo.email.validation.NotEmpty}")
    private String email;

    @Column(name = "CODE")
    @Length(message = "{msg://petclinic_Foo.code.validation.Length}", min = 2, max = 3)
    @NotEmpty(message = "{msg://petclinic_Foo.code.validation.NotEmpty}")
    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBar() {
        return bar;
    }

    public void setBar(String bar) {
        this.bar = bar;
    }
}