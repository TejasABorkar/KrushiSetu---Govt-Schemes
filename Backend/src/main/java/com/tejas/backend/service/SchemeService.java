package com.tejas.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.tejas.backend.repository.SchemeRepository;
import com.tejas.backend.model.Scheme;
import com.tejas.backend.dto.SchemeDTO;

import java.util.List;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;

    public SchemeService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    // ✅ NULL SAFE HELPER
    private String getSafe(String value, String fallback) {
        return value != null ? value : fallback;
    }

    // 🔥 CONVERT ENTITY → DTO (FINAL VERSION)
    private SchemeDTO convertToDTO(Scheme s, String lang) {

        SchemeDTO dto = new SchemeDTO();

        dto.setId(s.getId());
        dto.setOfficialLink(s.getOfficialLink());
        dto.setLastDate(s.getLastDate());
        dto.setImage(s.getImage());

        if (lang.equalsIgnoreCase("hi")) {
            dto.setSchemeName(getSafe(s.getSchemeNameHi(), s.getSchemeName()));
            dto.setCategory(getSafe(s.getCategoryHi(), s.getCategory()));
            dto.setState(getSafe(s.getStateHi(), s.getState()));
            dto.setDescription(getSafe(s.getDescriptionHi(), s.getDescription()));
            dto.setEligibility(getSafe(s.getEligibilityHi(), s.getEligibility()));
            dto.setBenefits(getSafe(s.getBenefitsHi(), s.getBenefits()));
            dto.setRequiredDocuments(getSafe(s.getRequiredDocumentsHi(), s.getRequiredDocuments()));
        }

        else if (lang.equalsIgnoreCase("mr")) {
            dto.setSchemeName(getSafe(s.getSchemeNameMr(), s.getSchemeName()));
            dto.setCategory(getSafe(s.getCategoryMr(), s.getCategory()));
            dto.setState(getSafe(s.getStateMr(), s.getState()));
            dto.setDescription(getSafe(s.getDescriptionMr(), s.getDescription()));
            dto.setEligibility(getSafe(s.getEligibilityMr(), s.getEligibility()));
            dto.setBenefits(getSafe(s.getBenefitsMr(), s.getBenefits()));
            dto.setRequiredDocuments(getSafe(s.getRequiredDocumentsMr(), s.getRequiredDocuments()));
        }

        else {
            dto.setSchemeName(s.getSchemeName());
            dto.setCategory(s.getCategory());
            dto.setState(s.getState());
            dto.setDescription(s.getDescription());
            dto.setEligibility(s.getEligibility());
            dto.setBenefits(s.getBenefits());
            dto.setRequiredDocuments(s.getRequiredDocuments());
        }

        return dto;
    }

    // ✅ GET ALL
    public List<SchemeDTO> getAllSchemes(String lang) {
        return schemeRepository.findAll()
                .stream()
                .map(s -> convertToDTO(s, lang))
                .toList();
    }

    // ✅ GET BY ID (WITH PRO ERROR HANDLING)
    public SchemeDTO getSchemeById(int id, String lang) {

        Scheme s = schemeRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Scheme not found with id: " + id)
                );

        return convertToDTO(s, lang);
    }

    // ✅ FILTER CATEGORY
    public List<SchemeDTO> getByCategory(String category, String lang) {
        return schemeRepository.findByCategory(category)
                .stream()
                .map(s -> convertToDTO(s, lang))
                .toList();
    }

    // ✅ FILTER STATE
    public List<SchemeDTO> getByState(String state, String lang) {
        return schemeRepository.findByState(state)
                .stream()
                .map(s -> convertToDTO(s, lang))
                .toList();
    }

    // ✅ STATES DROPDOWN
    public List<String> getAllDistinctStates() {
        return schemeRepository.findAll()
                .stream()
                .map(Scheme::getState)
                .distinct()
                .toList();
    }
}