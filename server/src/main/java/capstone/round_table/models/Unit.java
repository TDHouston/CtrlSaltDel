package capstone.round_table.models;

public enum Unit {
    TEASPOON("tsp"),
    TABLESPOON("tbsp"),
    CUP("cup"),
    FLUID_OUNCE("fl oz"),
    PINT("pt"),
    QUART("qt"),
    GALLON("gal"),
    OUNCE("oz"),
    POUND("lb"),
    MILLILITER("mL"),
    LITER("L"),
    GRAM("g"),
    KILOGRAM("kg"),
    PINCH("pinch");

    private String abbreviation;

    Unit(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getAbbreviation() {
        return abbreviation;
    }
}
