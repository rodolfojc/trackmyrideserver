const mongoose = require("mongoose");

const racksSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  features: [
    {
      type: {
        type: String,
      },
      geometry: {
        type: {
          type: String,
        },
        coordinates: [Number],
      },
      properties: {
        checked: {
          type: Boolean,
        },
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        notes: {
          type: String,
        },
        numberOfStands: {
          type: Number,
        },
        source: {
          type: String,
        },
        thefts: [],
        type: {
          type: String,
        },
        verified: {
          type: Boolean,
        },
      },
    },
  ],
});

mongoose.model("Racks", racksSchema);

/**
 * {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-6.471251, 53.281293],
      },
      properties: {
        checked: true,
        id: "b18593",
        name: "Outside Bank of Ireland",
        notes: "",
        numberOfStands: 3,
        source: "Bleeperbike",
        thefts: [],
        type: "Sheffield Stand",
        verified: true,
      },
    }
 */
