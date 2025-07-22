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
    PINCH("pinch"),
    SLICE("slice");

    private String abbreviation;

    Unit(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public static Unit getUnit(String abbreviation) {
        for (Unit u : Unit.values()) {
            if (u.abbreviation.equals(abbreviation)) {
                return u;
            }
        }
        return null;
    }
}
