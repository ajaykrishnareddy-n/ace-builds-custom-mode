ace.define(
  "ace/mode/siddhi",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/tokenizer",
    "ace/mode/siddhi_highlight_rules",
    "ace/range",
  ],
  function (require, exports, module) {
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var Tokenizer = require("../tokenizer").Tokenizer;
    var SiddhiHighlightRules =
      require("./siddhi_highlight_rules").SiddhiHighlightRules;
    var Range = require("../range").Range;

    // @nandha come back to this lates
    // var SiddhiFoldMode = require("./folding/siddhi").SiddhiFoldMode;

    var Mode = function () {
      this.$tokenizer = new Tokenizer(new SiddhiHighlightRules().getRules());
    };

    oop.inherits(Mode, TextMode);

    (function () {
      this.lineCommentStart = "--";
      this.$id = "ace/mode/siddhi";
    }.call(Mode.prototype));

    exports.Mode = Mode;
  }
);

ace.define(
  "ace/mode/siddhi_highlight_rules",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules",
  ],
  function (require, exports, module) {
    var oop = require("../lib/oop");
    var TextHighlightRules =
      require("./text_highlight_rules").TextHighlightRules;

    var SiddhiHighlightRules = function () {
      var keywords =
        "STREAM|DEFINE|FUNCTION|TRIGGER|TABLE|FROM|PARTITION|WINDOW|SELECT|GROUP|BY|" +
        "HAVING|ORDER|LIMIT|INSERT|DELETE|UPDATE|SET|RETURN|EVENTS|INTO|OUTPUT|EXPIRED|CURRENT|SNAPSHOT|" +
        "FOR|RAW|OF|AS|AT|OR|AND|IN|ON|IS|NOT|WITHIN|WITH|BEGIN|END|EVERY|LAST|ALL|FIRST|JOIN|" +
        "INNER|OUTER|RIGHT|LEFT|FULL|UNIDIRECTIONAL|YEAR|YEARS|MONTH|MONTHS|WEEK|WEEKS|DAY|DAYS|HOUR|HOURS|" +
        "MIN|MINUTE|MINUTES|SEC|SECOND|SECONDS|MILLISEC|MILLISECOND|MILLISECONDS|STRING|INT|LONG|FLOAT|DOUBLE|" +
        "BOOL|OBJECT|AGGREGATION|AGGREGATE|PER";

      //Aditional
      var builtInConstants = "TRUE|FALSE|NULL";

      var builtInBooleanConstants = "TRUE|FALSE";

      var builtInTypes = "STRING|INT|LONG|FLOAT|DOUBLE|BOOL|OBJECT";

      var keywordMapper = this.createKeywordMapper(
        {
          keyword: keywords,
          "constant.language": builtInConstants,
          "constant.language.boolean": builtInBooleanConstants,
          "support.type": builtInTypes,
        },
        "identifier",
        true
      );

      this.$rules = {
        start: [
          {
            token: [
              "annotation.plan.start",
              "keyword.other",
              "annotation.plan",
              "keyword.other",
            ],
            regex:
              "(@\\s*[Aa][Pp][Pp]\\s*)(:)(\\s*[a-zA-Z_][a-zA-Z_0-9]*\\s*)(\\(\\s*)",
            next: "annotation",
          },
          {
            token: ["annotation.common.start", "keyword.other"],
            regex: "(@\\s*[a-zA-Z_][a-zA-Z_0-9]*\\s*)(\\(\\s*)",
            next: "annotation",
          },
          {
            token: "comment.line",
            regex: "--.*$",
          },
          {
            token: "comment.block",
            start: "/\\*",
            end: "\\*/",
          },
          {
            token: "string.quoted.double",
            regex: '".*?"',
          },
          {
            token: "string.quoted.single",
            regex: "'.*?'",
          },
          {
            token: "constant.numeric",
            regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b",
          },
          {
            token: keywordMapper,
            regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b",
          },
          {
            token: "keyword.operator",
            regex:
              "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=|->",
          },
          {
            token: "keyword.other",
            regex: "\\?|:|;|,|\\.|#|@|\\[|\\]",
          },
          {
            token: "keyword.other.lparen",
            regex: "\\(",
          },
          {
            token: "keyword.other.rparen",
            regex: "\\)",
          },
          {
            token: "paren.lparen",
            regex: "{",
          },
          {
            token: "paren.rparen",
            regex: "}",
          },
          {
            token: "whitespace",
            regex: "\\s+",
          },
        ],
        annotation: [
          {
            token: ["annotation.common.start", "keyword.other"],
            regex: "(@\\s*[a-zA-Z_][a-zA-Z_0-9]*\\s*)(\\(\\s*)",
          },
          {
            token: "identifier",
            regex: "([a-zA-Z_][a-zA-Z_0-9]*\\s*)",
          },
          {
            token: "comment.line",
            regex: "--.*$",
          },
          {
            token: "comment.block",
            start: "/\\*",
            end: "\\*/",
          },
          {
            token: "string.quoted.double",
            regex: '".*?"',
          },
          {
            token: "string.quoted.single",
            regex: "'.*?'",
          },
          {
            token: "constant.numeric",
            regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b",
          },
          {
            token: "keyword.other.annotation.mid.end",
            regex: "\\)+\\s+,",
          },
          {
            token: "keyword.other.annotation.full.end",
            regex: "(\\)+\\s*)+",
            next: "start",
          },
          {
            token: "keyword.operator",
            regex: "=",
          },
          {
            token: "keyword.other",
            regex: "-|:|,|\\.",
          },
          {
            token: "whitespace",
            regex: "\\s+",
          },
        ],
      };

      this.normalizeRules();
    };

    oop.inherits(SiddhiHighlightRules, TextHighlightRules);
    exports.SiddhiHighlightRules = SiddhiHighlightRules;
  }
);
