module.exports = {
  "processors": ["stylelint-processor-html"],
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "function",
        "if",
        "extends",
        "warn",
        "return",
        "for"
      ]
    }],
    "no-empty-source": null,
    "declaration-empty-line-before": null,
  }
}
