package com.tejas.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "krushisetu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "scheme_name")
    private String schemeName;

    private String category;
    private String state;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Column(name = "required_documents", columnDefinition = "TEXT")
    private String requiredDocuments;

    @Column(name = "official_link")
    private String officialLink;

    @Column(name = "last_date")
    private String lastDate;

    @Column(name = "image_path")
    private String image;

    // 🌐 MULTILANGUAGE

    private String schemeNameHi;
    private String schemeNameMr;

    private String categoryHi;
    private String categoryMr;

    private String stateHi;
    private String stateMr;

    private String descriptionHi;
    private String descriptionMr;

    private String eligibilityHi;
    private String eligibilityMr;

    private String benefitsHi;
    private String benefitsMr;

    private String requiredDocumentsHi;
    private String requiredDocumentsMr;
}