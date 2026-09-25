package com.tejas.backend.controller;

import com.tejas.backend.dto.SchemeDTO;
import org.springframework.web.bind.annotation.*;
import com.tejas.backend.service.SchemeService;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "http://localhost:3000")
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    private String validateLang(String lang) {
        if (lang == null) return "en";

        if (lang.equalsIgnoreCase("hi") ||
                lang.equalsIgnoreCase("mr") ||
                lang.equalsIgnoreCase("en")) {
            return lang;
        }

        return "en";
    }

    @GetMapping
    public List<SchemeDTO> getAllSchemes(
            @RequestParam(defaultValue = "en") String lang) {

        return schemeService.getAllSchemes(validateLang(lang));
    }

    @GetMapping("/{id}")
    public SchemeDTO getSchemeById(
            @PathVariable int id,
            @RequestParam(defaultValue = "en") String lang) {

        return schemeService.getSchemeById(id, validateLang(lang));
    }

    @GetMapping("/category/{category}")
    public List<SchemeDTO> getByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "en") String lang) {

        return schemeService.getByCategory(category, validateLang(lang));
    }

    @GetMapping("/state/{state}")
    public List<SchemeDTO> getByState(
            @PathVariable String state,
            @RequestParam(defaultValue = "en") String lang) {

        return schemeService.getByState(state, validateLang(lang));
    }

    @GetMapping("/states")
    public List<String> getAllStates() {
        return schemeService.getAllDistinctStates();
    }
}