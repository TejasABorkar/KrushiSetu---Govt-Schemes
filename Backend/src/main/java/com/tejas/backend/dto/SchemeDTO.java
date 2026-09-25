package com.tejas.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SchemeDTO {

    private int id;
    private String schemeName;
    private String category;
    private String state;
    private String description;
    private String eligibility;
    private String benefits;
    private String requiredDocuments;
    private String officialLink;
    private String lastDate;
    private String image;
}