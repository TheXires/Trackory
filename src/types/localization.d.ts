interface Resources {
  "default": {
    "general": {
      "control": {
        "save": "Save",
        "cancel": "Cancel",
        "add": "Add",
        "create": "Create",
        "delete": "Delete",
        "edit": "Edit",
        "more": "More",
        "less": "Less",
        "ok": "Ok",
        "back": "Back"
      },
      "item": {
        "name": "Name",
        "calories": "Calories",
        "carbohydrates": "Carbohydrates",
        "fat": "Fat",
        "protein": "Protein"
      }
    },
    "screen": {
      "addItem": {
        "title": "Add Item"
      },
      "createItem": {
        "title": "Create Item",
        "addPhoto": "Add Photo"
      },
      "editItem": {
        "title": "Edit"
      },
      "home": {
        "title": "Overview",
        "today": "Today"
      },
      "itemDetails": {
        "title": "Item",
        "deleteItemDialogTitle": "Delete Item",
        "deleteItemDialogText": "Do your really want to delete this item?"
      },
      "items": {
        "title": "Items"
      },
      "settings": {
        "title": "Settings",
        "calorieTarget": "Daily calorie target",
        "calorieRequirementCalculator": "Calorie Requirement Calculator",
        "weight": "Weight",
        "dataExport": "Data export (JSON)",
        "dataImport": "Data import (JSON)",
        "realmExport": "Realm export",
        "recommendApp": "Recommend app",
        "imprint": "Imprint",
        "dialog": {
          "dailyCalorieTarget": "Daily Calorie Target",
          "dailyCalorieTargetQuestion": "Whats your daily calorie target?",
          "currentWeightTitle": "Current Weight",
          "currentWeightTitleQuestion": "How much do you currently weight?"
        }
      },
      "statistics": {
        "title": "Statistic",
        "monthly": "monthly"
      }
    },
    "component": {
      "homeProgress": {
        "today": "Today",
        "caloriesLeft": "{{caloriesLeft}} kcal to the target",
        "negativeCaloriesLeft": "{{caloriesLeft}} kcal above target"
      },
      "overviewItem": {
        "caloriesPerItem": "{{itemCalories}} kcal each"
      },
      "searchbar": {
        "search": "Search"
      }
    },
    "error": {
      "general": {
        "errorTitle": "Error",
        "unexpectedError": "An unexpected error occurred"
      },
      "createItem": {
        "create/no-name": "A name is required to create the item"
      },
      "dataExport": {
        "noDataToExport": "There are no data to export",
        "unableToOpenFile": "File could not be opened"
      },
      "dataImport": {
        "duplicateItems": "Unable to import data, because of duplicate items"
      }
    },
    "abbreviation": {
      "calorie": "cal",
      "gram": "g",
      "kilogram": "kg"
    }
  }
}

export default Resources;
