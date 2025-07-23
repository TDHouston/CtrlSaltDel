//package capstone.round_table.controllers;
//
//import capstone.round_table.domain.RecipeSearchService;
//import capstone.round_table.domain.RecipeService;
//import capstone.round_table.models.Recipe;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/elastic")
//public class ElasticController {
//    private final RecipeSearchService service;
//    private final RecipeService rservice;
//
//    public ElasticController(RecipeSearchService service, RecipeService rservice) {
//        this.service = service;
//        this.rservice = rservice;
//    }
//
//    @GetMapping
//    public String tester() {
//        return "HE";
//    }
//
//    @GetMapping("/add")
//    public String adding(@RequestBody Recipe recipe) {
//        service.add(recipe);
//        return "Added";
//    }
//
//}
