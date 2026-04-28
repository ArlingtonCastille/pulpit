/*
This is a generated file. Source available at:
https://github.com/ArlingtonCastille/pulpit
*/
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@mozilla/readability/Readability.js
var require_Readability = __commonJS({
  "node_modules/@mozilla/readability/Readability.js"(exports, module2) {
    function Readability2(doc, options) {
      if (options && options.documentElement) {
        doc = options;
        options = arguments[2];
      } else if (!doc || !doc.documentElement) {
        throw new Error("First argument to Readability constructor should be a document object.");
      }
      options = options || {};
      this._doc = doc;
      this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
      this._articleTitle = null;
      this._articleByline = null;
      this._articleDir = null;
      this._articleSiteName = null;
      this._attempts = [];
      this._debug = !!options.debug;
      this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
      this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
      this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
      this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
      this._keepClasses = !!options.keepClasses;
      this._serializer = options.serializer || function(el) {
        return el.innerHTML;
      };
      this._disableJSONLD = !!options.disableJSONLD;
      this._allowedVideoRegex = options.allowedVideoRegex || this.REGEXPS.videos;
      this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;
      if (this._debug) {
        let logNode = function(node) {
          if (node.nodeType == node.TEXT_NODE) {
            return `${node.nodeName} ("${node.textContent}")`;
          }
          let attrPairs = Array.from(node.attributes || [], function(attr) {
            return `${attr.name}="${attr.value}"`;
          }).join(" ");
          return `<${node.localName} ${attrPairs}>`;
        };
        this.log = function() {
          if (typeof console !== "undefined") {
            let args = Array.from(arguments, (arg) => {
              if (arg && arg.nodeType == this.ELEMENT_NODE) {
                return logNode(arg);
              }
              return arg;
            });
            args.unshift("Reader: (Readability)");
            console.log.apply(console, args);
          } else if (typeof dump !== "undefined") {
            var msg = Array.prototype.map.call(arguments, function(x) {
              return x && x.nodeName ? logNode(x) : x;
            }).join(" ");
            dump("Reader: (Readability) " + msg + "\n");
          }
        };
      } else {
        this.log = function() {
        };
      }
    }
    Readability2.prototype = {
      FLAG_STRIP_UNLIKELYS: 1,
      FLAG_WEIGHT_CLASSES: 2,
      FLAG_CLEAN_CONDITIONALLY: 4,
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
      ELEMENT_NODE: 1,
      TEXT_NODE: 3,
      // Max number of nodes supported by this parser. Default: 0 (no limit)
      DEFAULT_MAX_ELEMS_TO_PARSE: 0,
      // The number of top candidates to consider when analysing how
      // tight the competition is among candidates.
      DEFAULT_N_TOP_CANDIDATES: 5,
      // Element tags to score by default.
      DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
      // The default number of chars an article must have in order to return a result
      DEFAULT_CHAR_THRESHOLD: 500,
      // All of the regular expressions in use within readability.
      // Defined up here so we don't instantiate them repeatedly in loops.
      REGEXPS: {
        // NOTE: These two regular expressions are duplicated in
        // Readability-readerable.js. Please keep both copies in sync.
        unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
        okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
        positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
        negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
        extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
        byline: /byline|author|dateline|writtenby|p-author/i,
        replaceFonts: /<(\/?)font[^>]*>/gi,
        normalize: /\s{2,}/g,
        videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
        shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
        nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
        prevLink: /(prev|earl|old|new|<|«)/i,
        tokenize: /\W+/g,
        whitespace: /^\s*$/,
        hasContent: /\S$/,
        hashUrl: /^#.+/,
        srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
        b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
        // Commas as used in Latin, Sindhi, Chinese and various other scripts.
        // see: https://en.wikipedia.org/wiki/Comma#Comma_variants
        commas: /\u002C|\u060C|\uFE50|\uFE10|\uFE11|\u2E41|\u2E34|\u2E32|\uFF0C/g,
        // See: https://schema.org/Article
        jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
      },
      UNLIKELY_ROLES: ["menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog"],
      DIV_TO_P_ELEMS: /* @__PURE__ */ new Set(["BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL"]),
      ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],
      PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],
      DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],
      // The commented out elements qualify as phrasing content but tend to be
      // removed by readability when put into paragraphs, so we ignore them here.
      PHRASING_ELEMS: [
        // "CANVAS", "IFRAME", "SVG", "VIDEO",
        "ABBR",
        "AUDIO",
        "B",
        "BDO",
        "BR",
        "BUTTON",
        "CITE",
        "CODE",
        "DATA",
        "DATALIST",
        "DFN",
        "EM",
        "EMBED",
        "I",
        "IMG",
        "INPUT",
        "KBD",
        "LABEL",
        "MARK",
        "MATH",
        "METER",
        "NOSCRIPT",
        "OBJECT",
        "OUTPUT",
        "PROGRESS",
        "Q",
        "RUBY",
        "SAMP",
        "SCRIPT",
        "SELECT",
        "SMALL",
        "SPAN",
        "STRONG",
        "SUB",
        "SUP",
        "TEXTAREA",
        "TIME",
        "VAR",
        "WBR"
      ],
      // These are the classes that readability sets itself.
      CLASSES_TO_PRESERVE: ["page"],
      // These are the list of HTML entities that need to be escaped.
      HTML_ESCAPE_MAP: {
        "lt": "<",
        "gt": ">",
        "amp": "&",
        "quot": '"',
        "apos": "'"
      },
      /**
       * Run any post-process modifications to article content as necessary.
       *
       * @param Element
       * @return void
      **/
      _postProcessContent: function(articleContent) {
        this._fixRelativeUris(articleContent);
        this._simplifyNestedElements(articleContent);
        if (!this._keepClasses) {
          this._cleanClasses(articleContent);
        }
      },
      /**
       * Iterates over a NodeList, calls `filterFn` for each node and removes node
       * if function returned `true`.
       *
       * If function is not passed, removes all the nodes in node list.
       *
       * @param NodeList nodeList The nodes to operate on
       * @param Function filterFn the function to use as a filter
       * @return void
       */
      _removeNodes: function(nodeList, filterFn) {
        if (this._docJSDOMParser && nodeList._isLiveNodeList) {
          throw new Error("Do not pass live node lists to _removeNodes");
        }
        for (var i = nodeList.length - 1; i >= 0; i--) {
          var node = nodeList[i];
          var parentNode = node.parentNode;
          if (parentNode) {
            if (!filterFn || filterFn.call(this, node, i, nodeList)) {
              parentNode.removeChild(node);
            }
          }
        }
      },
      /**
       * Iterates over a NodeList, and calls _setNodeTag for each node.
       *
       * @param NodeList nodeList The nodes to operate on
       * @param String newTagName the new tag name to use
       * @return void
       */
      _replaceNodeTags: function(nodeList, newTagName) {
        if (this._docJSDOMParser && nodeList._isLiveNodeList) {
          throw new Error("Do not pass live node lists to _replaceNodeTags");
        }
        for (const node of nodeList) {
          this._setNodeTag(node, newTagName);
        }
      },
      /**
       * Iterate over a NodeList, which doesn't natively fully implement the Array
       * interface.
       *
       * For convenience, the current object context is applied to the provided
       * iterate function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The iterate function.
       * @return void
       */
      _forEachNode: function(nodeList, fn) {
        Array.prototype.forEach.call(nodeList, fn, this);
      },
      /**
       * Iterate over a NodeList, and return the first node that passes
       * the supplied test function
       *
       * For convenience, the current object context is applied to the provided
       * test function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The test function.
       * @return void
       */
      _findNode: function(nodeList, fn) {
        return Array.prototype.find.call(nodeList, fn, this);
      },
      /**
       * Iterate over a NodeList, return true if any of the provided iterate
       * function calls returns true, false otherwise.
       *
       * For convenience, the current object context is applied to the
       * provided iterate function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The iterate function.
       * @return Boolean
       */
      _someNode: function(nodeList, fn) {
        return Array.prototype.some.call(nodeList, fn, this);
      },
      /**
       * Iterate over a NodeList, return true if all of the provided iterate
       * function calls return true, false otherwise.
       *
       * For convenience, the current object context is applied to the
       * provided iterate function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The iterate function.
       * @return Boolean
       */
      _everyNode: function(nodeList, fn) {
        return Array.prototype.every.call(nodeList, fn, this);
      },
      /**
       * Concat all nodelists passed as arguments.
       *
       * @return ...NodeList
       * @return Array
       */
      _concatNodeLists: function() {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments);
        var nodeLists = args.map(function(list) {
          return slice.call(list);
        });
        return Array.prototype.concat.apply([], nodeLists);
      },
      _getAllNodesWithTag: function(node, tagNames) {
        if (node.querySelectorAll) {
          return node.querySelectorAll(tagNames.join(","));
        }
        return [].concat.apply([], tagNames.map(function(tag) {
          var collection = node.getElementsByTagName(tag);
          return Array.isArray(collection) ? collection : Array.from(collection);
        }));
      },
      /**
       * Removes the class="" attribute from every element in the given
       * subtree, except those that match CLASSES_TO_PRESERVE and
       * the classesToPreserve array from the options object.
       *
       * @param Element
       * @return void
       */
      _cleanClasses: function(node) {
        var classesToPreserve = this._classesToPreserve;
        var className = (node.getAttribute("class") || "").split(/\s+/).filter(function(cls) {
          return classesToPreserve.indexOf(cls) != -1;
        }).join(" ");
        if (className) {
          node.setAttribute("class", className);
        } else {
          node.removeAttribute("class");
        }
        for (node = node.firstElementChild; node; node = node.nextElementSibling) {
          this._cleanClasses(node);
        }
      },
      /**
       * Converts each <a> and <img> uri in the given element to an absolute URI,
       * ignoring #ref URIs.
       *
       * @param Element
       * @return void
       */
      _fixRelativeUris: function(articleContent) {
        var baseURI = this._doc.baseURI;
        var documentURI = this._doc.documentURI;
        function toAbsoluteURI(uri) {
          if (baseURI == documentURI && uri.charAt(0) == "#") {
            return uri;
          }
          try {
            return new URL(uri, baseURI).href;
          } catch (ex) {
          }
          return uri;
        }
        var links = this._getAllNodesWithTag(articleContent, ["a"]);
        this._forEachNode(links, function(link) {
          var href = link.getAttribute("href");
          if (href) {
            if (href.indexOf("javascript:") === 0) {
              if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
                var text = this._doc.createTextNode(link.textContent);
                link.parentNode.replaceChild(text, link);
              } else {
                var container = this._doc.createElement("span");
                while (link.firstChild) {
                  container.appendChild(link.firstChild);
                }
                link.parentNode.replaceChild(container, link);
              }
            } else {
              link.setAttribute("href", toAbsoluteURI(href));
            }
          }
        });
        var medias = this._getAllNodesWithTag(articleContent, [
          "img",
          "picture",
          "figure",
          "video",
          "audio",
          "source"
        ]);
        this._forEachNode(medias, function(media) {
          var src = media.getAttribute("src");
          var poster = media.getAttribute("poster");
          var srcset = media.getAttribute("srcset");
          if (src) {
            media.setAttribute("src", toAbsoluteURI(src));
          }
          if (poster) {
            media.setAttribute("poster", toAbsoluteURI(poster));
          }
          if (srcset) {
            var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_, p1, p2, p3) {
              return toAbsoluteURI(p1) + (p2 || "") + p3;
            });
            media.setAttribute("srcset", newSrcset);
          }
        });
      },
      _simplifyNestedElements: function(articleContent) {
        var node = articleContent;
        while (node) {
          if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
            if (this._isElementWithoutContent(node)) {
              node = this._removeAndGetNext(node);
              continue;
            } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
              var child = node.children[0];
              for (var i = 0; i < node.attributes.length; i++) {
                child.setAttribute(node.attributes[i].name, node.attributes[i].value);
              }
              node.parentNode.replaceChild(child, node);
              node = child;
              continue;
            }
          }
          node = this._getNextNode(node);
        }
      },
      /**
       * Get the article title as an H1.
       *
       * @return string
       **/
      _getArticleTitle: function() {
        var doc = this._doc;
        var curTitle = "";
        var origTitle = "";
        try {
          curTitle = origTitle = doc.title.trim();
          if (typeof curTitle !== "string")
            curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
        } catch (e) {
        }
        var titleHadHierarchicalSeparators = false;
        function wordCount(str) {
          return str.split(/\s+/).length;
        }
        if (/ [\|\-\\\/>»] /.test(curTitle)) {
          titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
          curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");
          if (wordCount(curTitle) < 3)
            curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
        } else if (curTitle.indexOf(": ") !== -1) {
          var headings = this._concatNodeLists(
            doc.getElementsByTagName("h1"),
            doc.getElementsByTagName("h2")
          );
          var trimmedTitle = curTitle.trim();
          var match = this._someNode(headings, function(heading) {
            return heading.textContent.trim() === trimmedTitle;
          });
          if (!match) {
            curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);
            if (wordCount(curTitle) < 3) {
              curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
            } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
              curTitle = origTitle;
            }
          }
        } else if (curTitle.length > 150 || curTitle.length < 15) {
          var hOnes = doc.getElementsByTagName("h1");
          if (hOnes.length === 1)
            curTitle = this._getInnerText(hOnes[0]);
        }
        curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
        var curTitleWordCount = wordCount(curTitle);
        if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
          curTitle = origTitle;
        }
        return curTitle;
      },
      /**
       * Prepare the HTML document for readability to scrape it.
       * This includes things like stripping javascript, CSS, and handling terrible markup.
       *
       * @return void
       **/
      _prepDocument: function() {
        var doc = this._doc;
        this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));
        if (doc.body) {
          this._replaceBrs(doc.body);
        }
        this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
      },
      /**
       * Finds the next node, starting from the given node, and ignoring
       * whitespace in between. If the given node is an element, the same node is
       * returned.
       */
      _nextNode: function(node) {
        var next2 = node;
        while (next2 && next2.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next2.textContent)) {
          next2 = next2.nextSibling;
        }
        return next2;
      },
      /**
       * Replaces 2 or more successive <br> elements with a single <p>.
       * Whitespace between <br> elements are ignored. For example:
       *   <div>foo<br>bar<br> <br><br>abc</div>
       * will become:
       *   <div>foo<br>bar<p>abc</p></div>
       */
      _replaceBrs: function(elem) {
        this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
          var next2 = br.nextSibling;
          var replaced = false;
          while ((next2 = this._nextNode(next2)) && next2.tagName == "BR") {
            replaced = true;
            var brSibling = next2.nextSibling;
            next2.parentNode.removeChild(next2);
            next2 = brSibling;
          }
          if (replaced) {
            var p = this._doc.createElement("p");
            br.parentNode.replaceChild(p, br);
            next2 = p.nextSibling;
            while (next2) {
              if (next2.tagName == "BR") {
                var nextElem = this._nextNode(next2.nextSibling);
                if (nextElem && nextElem.tagName == "BR")
                  break;
              }
              if (!this._isPhrasingContent(next2))
                break;
              var sibling = next2.nextSibling;
              p.appendChild(next2);
              next2 = sibling;
            }
            while (p.lastChild && this._isWhitespace(p.lastChild)) {
              p.removeChild(p.lastChild);
            }
            if (p.parentNode.tagName === "P")
              this._setNodeTag(p.parentNode, "DIV");
          }
        });
      },
      _setNodeTag: function(node, tag) {
        this.log("_setNodeTag", node, tag);
        if (this._docJSDOMParser) {
          node.localName = tag.toLowerCase();
          node.tagName = tag.toUpperCase();
          return node;
        }
        var replacement = node.ownerDocument.createElement(tag);
        while (node.firstChild) {
          replacement.appendChild(node.firstChild);
        }
        node.parentNode.replaceChild(replacement, node);
        if (node.readability)
          replacement.readability = node.readability;
        for (var i = 0; i < node.attributes.length; i++) {
          try {
            replacement.setAttribute(node.attributes[i].name, node.attributes[i].value);
          } catch (ex) {
          }
        }
        return replacement;
      },
      /**
       * Prepare the article node for display. Clean out any inline styles,
       * iframes, forms, strip extraneous <p> tags, etc.
       *
       * @param Element
       * @return void
       **/
      _prepArticle: function(articleContent) {
        this._cleanStyles(articleContent);
        this._markDataTables(articleContent);
        this._fixLazyImages(articleContent);
        this._cleanConditionally(articleContent, "form");
        this._cleanConditionally(articleContent, "fieldset");
        this._clean(articleContent, "object");
        this._clean(articleContent, "embed");
        this._clean(articleContent, "footer");
        this._clean(articleContent, "link");
        this._clean(articleContent, "aside");
        var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;
        this._forEachNode(articleContent.children, function(topCandidate) {
          this._cleanMatchedNodes(topCandidate, function(node, matchString) {
            return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
          });
        });
        this._clean(articleContent, "iframe");
        this._clean(articleContent, "input");
        this._clean(articleContent, "textarea");
        this._clean(articleContent, "select");
        this._clean(articleContent, "button");
        this._cleanHeaders(articleContent);
        this._cleanConditionally(articleContent, "table");
        this._cleanConditionally(articleContent, "ul");
        this._cleanConditionally(articleContent, "div");
        this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");
        this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function(paragraph) {
          var imgCount = paragraph.getElementsByTagName("img").length;
          var embedCount = paragraph.getElementsByTagName("embed").length;
          var objectCount = paragraph.getElementsByTagName("object").length;
          var iframeCount = paragraph.getElementsByTagName("iframe").length;
          var totalCount = imgCount + embedCount + objectCount + iframeCount;
          return totalCount === 0 && !this._getInnerText(paragraph, false);
        });
        this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
          var next2 = this._nextNode(br.nextSibling);
          if (next2 && next2.tagName == "P")
            br.parentNode.removeChild(br);
        });
        this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
          var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
          if (this._hasSingleTagInsideElement(tbody, "TR")) {
            var row = tbody.firstElementChild;
            if (this._hasSingleTagInsideElement(row, "TD")) {
              var cell = row.firstElementChild;
              cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
              table.parentNode.replaceChild(cell, table);
            }
          }
        });
      },
      /**
       * Initialize a node with the readability object. Also checks the
       * className/id for special names to add to its score.
       *
       * @param Element
       * @return void
      **/
      _initializeNode: function(node) {
        node.readability = { "contentScore": 0 };
        switch (node.tagName) {
          case "DIV":
            node.readability.contentScore += 5;
            break;
          case "PRE":
          case "TD":
          case "BLOCKQUOTE":
            node.readability.contentScore += 3;
            break;
          case "ADDRESS":
          case "OL":
          case "UL":
          case "DL":
          case "DD":
          case "DT":
          case "LI":
          case "FORM":
            node.readability.contentScore -= 3;
            break;
          case "H1":
          case "H2":
          case "H3":
          case "H4":
          case "H5":
          case "H6":
          case "TH":
            node.readability.contentScore -= 5;
            break;
        }
        node.readability.contentScore += this._getClassWeight(node);
      },
      _removeAndGetNext: function(node) {
        var nextNode = this._getNextNode(node, true);
        node.parentNode.removeChild(node);
        return nextNode;
      },
      /**
       * Traverse the DOM from node to node, starting at the node passed in.
       * Pass true for the second parameter to indicate this node itself
       * (and its kids) are going away, and we want the next node over.
       *
       * Calling this in a loop will traverse the DOM depth-first.
       */
      _getNextNode: function(node, ignoreSelfAndKids) {
        if (!ignoreSelfAndKids && node.firstElementChild) {
          return node.firstElementChild;
        }
        if (node.nextElementSibling) {
          return node.nextElementSibling;
        }
        do {
          node = node.parentNode;
        } while (node && !node.nextElementSibling);
        return node && node.nextElementSibling;
      },
      // compares second text to first one
      // 1 = same text, 0 = completely different text
      // works the way that it splits both texts into words and then finds words that are unique in second text
      // the result is given by the lower length of unique parts
      _textSimilarity: function(textA, textB) {
        var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
        var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
        if (!tokensA.length || !tokensB.length) {
          return 0;
        }
        var uniqTokensB = tokensB.filter((token) => !tokensA.includes(token));
        var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
        return 1 - distanceB;
      },
      _checkByline: function(node, matchString) {
        if (this._articleByline) {
          return false;
        }
        if (node.getAttribute !== void 0) {
          var rel = node.getAttribute("rel");
          var itemprop = node.getAttribute("itemprop");
        }
        if ((rel === "author" || itemprop && itemprop.indexOf("author") !== -1 || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
          this._articleByline = node.textContent.trim();
          return true;
        }
        return false;
      },
      _getNodeAncestors: function(node, maxDepth) {
        maxDepth = maxDepth || 0;
        var i = 0, ancestors = [];
        while (node.parentNode) {
          ancestors.push(node.parentNode);
          if (maxDepth && ++i === maxDepth)
            break;
          node = node.parentNode;
        }
        return ancestors;
      },
      /***
       * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
       *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
       *
       * @param page a document to run upon. Needs to be a full document, complete with body.
       * @return Element
      **/
      _grabArticle: function(page) {
        this.log("**** grabArticle ****");
        var doc = this._doc;
        var isPaging = page !== null;
        page = page ? page : this._doc.body;
        if (!page) {
          this.log("No body found in document. Abort.");
          return null;
        }
        var pageCacheHtml = page.innerHTML;
        while (true) {
          this.log("Starting grabArticle loop");
          var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);
          var elementsToScore = [];
          var node = this._doc.documentElement;
          let shouldRemoveTitleHeader = true;
          while (node) {
            if (node.tagName === "HTML") {
              this._articleLang = node.getAttribute("lang");
            }
            var matchString = node.className + " " + node.id;
            if (!this._isProbablyVisible(node)) {
              this.log("Removing hidden node - " + matchString);
              node = this._removeAndGetNext(node);
              continue;
            }
            if (node.getAttribute("aria-modal") == "true" && node.getAttribute("role") == "dialog") {
              node = this._removeAndGetNext(node);
              continue;
            }
            if (this._checkByline(node, matchString)) {
              node = this._removeAndGetNext(node);
              continue;
            }
            if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
              this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
              shouldRemoveTitleHeader = false;
              node = this._removeAndGetNext(node);
              continue;
            }
            if (stripUnlikelyCandidates) {
              if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && !this._hasAncestorTag(node, "table") && !this._hasAncestorTag(node, "code") && node.tagName !== "BODY" && node.tagName !== "A") {
                this.log("Removing unlikely candidate - " + matchString);
                node = this._removeAndGetNext(node);
                continue;
              }
              if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
                this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
                node = this._removeAndGetNext(node);
                continue;
              }
            }
            if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
              node = this._removeAndGetNext(node);
              continue;
            }
            if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
              elementsToScore.push(node);
            }
            if (node.tagName === "DIV") {
              var p = null;
              var childNode = node.firstChild;
              while (childNode) {
                var nextSibling = childNode.nextSibling;
                if (this._isPhrasingContent(childNode)) {
                  if (p !== null) {
                    p.appendChild(childNode);
                  } else if (!this._isWhitespace(childNode)) {
                    p = doc.createElement("p");
                    node.replaceChild(p, childNode);
                    p.appendChild(childNode);
                  }
                } else if (p !== null) {
                  while (p.lastChild && this._isWhitespace(p.lastChild)) {
                    p.removeChild(p.lastChild);
                  }
                  p = null;
                }
                childNode = nextSibling;
              }
              if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
                var newNode = node.children[0];
                node.parentNode.replaceChild(newNode, node);
                node = newNode;
                elementsToScore.push(node);
              } else if (!this._hasChildBlockElement(node)) {
                node = this._setNodeTag(node, "P");
                elementsToScore.push(node);
              }
            }
            node = this._getNextNode(node);
          }
          var candidates = [];
          this._forEachNode(elementsToScore, function(elementToScore) {
            if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined")
              return;
            var innerText = this._getInnerText(elementToScore);
            if (innerText.length < 25)
              return;
            var ancestors2 = this._getNodeAncestors(elementToScore, 5);
            if (ancestors2.length === 0)
              return;
            var contentScore = 0;
            contentScore += 1;
            contentScore += innerText.split(this.REGEXPS.commas).length;
            contentScore += Math.min(Math.floor(innerText.length / 100), 3);
            this._forEachNode(ancestors2, function(ancestor, level) {
              if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined")
                return;
              if (typeof ancestor.readability === "undefined") {
                this._initializeNode(ancestor);
                candidates.push(ancestor);
              }
              if (level === 0)
                var scoreDivider = 1;
              else if (level === 1)
                scoreDivider = 2;
              else
                scoreDivider = level * 3;
              ancestor.readability.contentScore += contentScore / scoreDivider;
            });
          });
          var topCandidates = [];
          for (var c = 0, cl = candidates.length; c < cl; c += 1) {
            var candidate = candidates[c];
            var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
            candidate.readability.contentScore = candidateScore;
            this.log("Candidate:", candidate, "with score " + candidateScore);
            for (var t = 0; t < this._nbTopCandidates; t++) {
              var aTopCandidate = topCandidates[t];
              if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
                topCandidates.splice(t, 0, candidate);
                if (topCandidates.length > this._nbTopCandidates)
                  topCandidates.pop();
                break;
              }
            }
          }
          var topCandidate = topCandidates[0] || null;
          var neededToCreateTopCandidate = false;
          var parentOfTopCandidate;
          if (topCandidate === null || topCandidate.tagName === "BODY") {
            topCandidate = doc.createElement("DIV");
            neededToCreateTopCandidate = true;
            while (page.firstChild) {
              this.log("Moving child out:", page.firstChild);
              topCandidate.appendChild(page.firstChild);
            }
            page.appendChild(topCandidate);
            this._initializeNode(topCandidate);
          } else if (topCandidate) {
            var alternativeCandidateAncestors = [];
            for (var i = 1; i < topCandidates.length; i++) {
              if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
                alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
              }
            }
            var MINIMUM_TOPCANDIDATES = 3;
            if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
              parentOfTopCandidate = topCandidate.parentNode;
              while (parentOfTopCandidate.tagName !== "BODY") {
                var listsContainingThisAncestor = 0;
                for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
                  listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
                }
                if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
                  topCandidate = parentOfTopCandidate;
                  break;
                }
                parentOfTopCandidate = parentOfTopCandidate.parentNode;
              }
            }
            if (!topCandidate.readability) {
              this._initializeNode(topCandidate);
            }
            parentOfTopCandidate = topCandidate.parentNode;
            var lastScore = topCandidate.readability.contentScore;
            var scoreThreshold = lastScore / 3;
            while (parentOfTopCandidate.tagName !== "BODY") {
              if (!parentOfTopCandidate.readability) {
                parentOfTopCandidate = parentOfTopCandidate.parentNode;
                continue;
              }
              var parentScore = parentOfTopCandidate.readability.contentScore;
              if (parentScore < scoreThreshold)
                break;
              if (parentScore > lastScore) {
                topCandidate = parentOfTopCandidate;
                break;
              }
              lastScore = parentOfTopCandidate.readability.contentScore;
              parentOfTopCandidate = parentOfTopCandidate.parentNode;
            }
            parentOfTopCandidate = topCandidate.parentNode;
            while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
              topCandidate = parentOfTopCandidate;
              parentOfTopCandidate = topCandidate.parentNode;
            }
            if (!topCandidate.readability) {
              this._initializeNode(topCandidate);
            }
          }
          var articleContent = doc.createElement("DIV");
          if (isPaging)
            articleContent.id = "readability-content";
          var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
          parentOfTopCandidate = topCandidate.parentNode;
          var siblings = parentOfTopCandidate.children;
          for (var s = 0, sl = siblings.length; s < sl; s++) {
            var sibling = siblings[s];
            var append = false;
            this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
            this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");
            if (sibling === topCandidate) {
              append = true;
            } else {
              var contentBonus = 0;
              if (sibling.className === topCandidate.className && topCandidate.className !== "")
                contentBonus += topCandidate.readability.contentScore * 0.2;
              if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) {
                append = true;
              } else if (sibling.nodeName === "P") {
                var linkDensity = this._getLinkDensity(sibling);
                var nodeContent = this._getInnerText(sibling);
                var nodeLength = nodeContent.length;
                if (nodeLength > 80 && linkDensity < 0.25) {
                  append = true;
                } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) {
                  append = true;
                }
              }
            }
            if (append) {
              this.log("Appending node:", sibling);
              if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
                this.log("Altering sibling:", sibling, "to div.");
                sibling = this._setNodeTag(sibling, "DIV");
              }
              articleContent.appendChild(sibling);
              siblings = parentOfTopCandidate.children;
              s -= 1;
              sl -= 1;
            }
          }
          if (this._debug)
            this.log("Article content pre-prep: " + articleContent.innerHTML);
          this._prepArticle(articleContent);
          if (this._debug)
            this.log("Article content post-prep: " + articleContent.innerHTML);
          if (neededToCreateTopCandidate) {
            topCandidate.id = "readability-page-1";
            topCandidate.className = "page";
          } else {
            var div = doc.createElement("DIV");
            div.id = "readability-page-1";
            div.className = "page";
            while (articleContent.firstChild) {
              div.appendChild(articleContent.firstChild);
            }
            articleContent.appendChild(div);
          }
          if (this._debug)
            this.log("Article content after paging: " + articleContent.innerHTML);
          var parseSuccessful = true;
          var textLength = this._getInnerText(articleContent, true).length;
          if (textLength < this._charThreshold) {
            parseSuccessful = false;
            page.innerHTML = pageCacheHtml;
            if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
              this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
              this._attempts.push({ articleContent, textLength });
            } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
              this._removeFlag(this.FLAG_WEIGHT_CLASSES);
              this._attempts.push({ articleContent, textLength });
            } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
              this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
              this._attempts.push({ articleContent, textLength });
            } else {
              this._attempts.push({ articleContent, textLength });
              this._attempts.sort(function(a, b) {
                return b.textLength - a.textLength;
              });
              if (!this._attempts[0].textLength) {
                return null;
              }
              articleContent = this._attempts[0].articleContent;
              parseSuccessful = true;
            }
          }
          if (parseSuccessful) {
            var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
            this._someNode(ancestors, function(ancestor) {
              if (!ancestor.tagName)
                return false;
              var articleDir = ancestor.getAttribute("dir");
              if (articleDir) {
                this._articleDir = articleDir;
                return true;
              }
              return false;
            });
            return articleContent;
          }
        }
      },
      /**
       * Check whether the input string could be a byline.
       * This verifies that the input is a string, and that the length
       * is less than 100 chars.
       *
       * @param possibleByline {string} - a string to check whether its a byline.
       * @return Boolean - whether the input string is a byline.
       */
      _isValidByline: function(byline) {
        if (typeof byline == "string" || byline instanceof String) {
          byline = byline.trim();
          return byline.length > 0 && byline.length < 100;
        }
        return false;
      },
      /**
       * Converts some of the common HTML entities in string to their corresponding characters.
       *
       * @param str {string} - a string to unescape.
       * @return string without HTML entity.
       */
      _unescapeHtmlEntities: function(str) {
        if (!str) {
          return str;
        }
        var htmlEscapeMap = this.HTML_ESCAPE_MAP;
        return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_, tag) {
          return htmlEscapeMap[tag];
        }).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, function(_, hex, numStr) {
          var num = parseInt(hex || numStr, hex ? 16 : 10);
          return String.fromCharCode(num);
        });
      },
      /**
       * Try to extract metadata from JSON-LD object.
       * For now, only Schema.org objects of type Article or its subtypes are supported.
       * @return Object with any metadata that could be extracted (possibly none)
       */
      _getJSONLD: function(doc) {
        var scripts = this._getAllNodesWithTag(doc, ["script"]);
        var metadata;
        this._forEachNode(scripts, function(jsonLdElement) {
          if (!metadata && jsonLdElement.getAttribute("type") === "application/ld+json") {
            try {
              var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
              var parsed = JSON.parse(content);
              if (!parsed["@context"] || !parsed["@context"].match(/^https?\:\/\/schema\.org$/)) {
                return;
              }
              if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
                parsed = parsed["@graph"].find(function(it) {
                  return (it["@type"] || "").match(
                    this.REGEXPS.jsonLdArticleTypes
                  );
                });
              }
              if (!parsed || !parsed["@type"] || !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)) {
                return;
              }
              metadata = {};
              if (typeof parsed.name === "string" && typeof parsed.headline === "string" && parsed.name !== parsed.headline) {
                var title = this._getArticleTitle();
                var nameMatches = this._textSimilarity(parsed.name, title) > 0.75;
                var headlineMatches = this._textSimilarity(parsed.headline, title) > 0.75;
                if (headlineMatches && !nameMatches) {
                  metadata.title = parsed.headline;
                } else {
                  metadata.title = parsed.name;
                }
              } else if (typeof parsed.name === "string") {
                metadata.title = parsed.name.trim();
              } else if (typeof parsed.headline === "string") {
                metadata.title = parsed.headline.trim();
              }
              if (parsed.author) {
                if (typeof parsed.author.name === "string") {
                  metadata.byline = parsed.author.name.trim();
                } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
                  metadata.byline = parsed.author.filter(function(author) {
                    return author && typeof author.name === "string";
                  }).map(function(author) {
                    return author.name.trim();
                  }).join(", ");
                }
              }
              if (typeof parsed.description === "string") {
                metadata.excerpt = parsed.description.trim();
              }
              if (parsed.publisher && typeof parsed.publisher.name === "string") {
                metadata.siteName = parsed.publisher.name.trim();
              }
              if (typeof parsed.datePublished === "string") {
                metadata.datePublished = parsed.datePublished.trim();
              }
              return;
            } catch (err) {
              this.log(err.message);
            }
          }
        });
        return metadata ? metadata : {};
      },
      /**
       * Attempts to get excerpt and byline metadata for the article.
       *
       * @param {Object} jsonld — object containing any metadata that
       * could be extracted from JSON-LD object.
       *
       * @return Object with optional "excerpt" and "byline" properties
       */
      _getArticleMetadata: function(jsonld) {
        var metadata = {};
        var values = {};
        var metaElements = this._doc.getElementsByTagName("meta");
        var propertyPattern = /\s*(article|dc|dcterm|og|twitter)\s*:\s*(author|creator|description|published_time|title|site_name)\s*/gi;
        var namePattern = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;
        this._forEachNode(metaElements, function(element) {
          var elementName = element.getAttribute("name");
          var elementProperty = element.getAttribute("property");
          var content = element.getAttribute("content");
          if (!content) {
            return;
          }
          var matches = null;
          var name = null;
          if (elementProperty) {
            matches = elementProperty.match(propertyPattern);
            if (matches) {
              name = matches[0].toLowerCase().replace(/\s/g, "");
              values[name] = content.trim();
            }
          }
          if (!matches && elementName && namePattern.test(elementName)) {
            name = elementName;
            if (content) {
              name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
              values[name] = content.trim();
            }
          }
        });
        metadata.title = jsonld.title || values["dc:title"] || values["dcterm:title"] || values["og:title"] || values["weibo:article:title"] || values["weibo:webpage:title"] || values["title"] || values["twitter:title"];
        if (!metadata.title) {
          metadata.title = this._getArticleTitle();
        }
        metadata.byline = jsonld.byline || values["dc:creator"] || values["dcterm:creator"] || values["author"];
        metadata.excerpt = jsonld.excerpt || values["dc:description"] || values["dcterm:description"] || values["og:description"] || values["weibo:article:description"] || values["weibo:webpage:description"] || values["description"] || values["twitter:description"];
        metadata.siteName = jsonld.siteName || values["og:site_name"];
        metadata.publishedTime = jsonld.datePublished || values["article:published_time"] || null;
        metadata.title = this._unescapeHtmlEntities(metadata.title);
        metadata.byline = this._unescapeHtmlEntities(metadata.byline);
        metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
        metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);
        metadata.publishedTime = this._unescapeHtmlEntities(metadata.publishedTime);
        return metadata;
      },
      /**
       * Check if node is image, or if node contains exactly only one image
       * whether as a direct child or as its descendants.
       *
       * @param Element
      **/
      _isSingleImage: function(node) {
        if (node.tagName === "IMG") {
          return true;
        }
        if (node.children.length !== 1 || node.textContent.trim() !== "") {
          return false;
        }
        return this._isSingleImage(node.children[0]);
      },
      /**
       * Find all <noscript> that are located after <img> nodes, and which contain only one
       * <img> element. Replace the first image with the image from inside the <noscript> tag,
       * and remove the <noscript> tag. This improves the quality of the images we use on
       * some sites (e.g. Medium).
       *
       * @param Element
      **/
      _unwrapNoscriptImages: function(doc) {
        var imgs = Array.from(doc.getElementsByTagName("img"));
        this._forEachNode(imgs, function(img) {
          for (var i = 0; i < img.attributes.length; i++) {
            var attr = img.attributes[i];
            switch (attr.name) {
              case "src":
              case "srcset":
              case "data-src":
              case "data-srcset":
                return;
            }
            if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
              return;
            }
          }
          img.parentNode.removeChild(img);
        });
        var noscripts = Array.from(doc.getElementsByTagName("noscript"));
        this._forEachNode(noscripts, function(noscript) {
          var tmp = doc.createElement("div");
          tmp.innerHTML = noscript.innerHTML;
          if (!this._isSingleImage(tmp)) {
            return;
          }
          var prevElement = noscript.previousElementSibling;
          if (prevElement && this._isSingleImage(prevElement)) {
            var prevImg = prevElement;
            if (prevImg.tagName !== "IMG") {
              prevImg = prevElement.getElementsByTagName("img")[0];
            }
            var newImg = tmp.getElementsByTagName("img")[0];
            for (var i = 0; i < prevImg.attributes.length; i++) {
              var attr = prevImg.attributes[i];
              if (attr.value === "") {
                continue;
              }
              if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                if (newImg.getAttribute(attr.name) === attr.value) {
                  continue;
                }
                var attrName = attr.name;
                if (newImg.hasAttribute(attrName)) {
                  attrName = "data-old-" + attrName;
                }
                newImg.setAttribute(attrName, attr.value);
              }
            }
            noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
          }
        });
      },
      /**
       * Removes script tags from the document.
       *
       * @param Element
      **/
      _removeScripts: function(doc) {
        this._removeNodes(this._getAllNodesWithTag(doc, ["script", "noscript"]));
      },
      /**
       * Check if this node has only whitespace and a single element with given tag
       * Returns false if the DIV node contains non-empty text nodes
       * or if it contains no element with given tag or more than 1 element.
       *
       * @param Element
       * @param string tag of child element
      **/
      _hasSingleTagInsideElement: function(element, tag) {
        if (element.children.length != 1 || element.children[0].tagName !== tag) {
          return false;
        }
        return !this._someNode(element.childNodes, function(node) {
          return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
        });
      },
      _isElementWithoutContent: function(node) {
        return node.nodeType === this.ELEMENT_NODE && node.textContent.trim().length == 0 && (node.children.length == 0 || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
      },
      /**
       * Determine whether element has any children block level elements.
       *
       * @param Element
       */
      _hasChildBlockElement: function(element) {
        return this._someNode(element.childNodes, function(node) {
          return this.DIV_TO_P_ELEMS.has(node.tagName) || this._hasChildBlockElement(node);
        });
      },
      /***
       * Determine if a node qualifies as phrasing content.
       * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
      **/
      _isPhrasingContent: function(node) {
        return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
      },
      _isWhitespace: function(node) {
        return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
      },
      /**
       * Get the inner text of a node - cross browser compatibly.
       * This also strips out any excess whitespace to be found.
       *
       * @param Element
       * @param Boolean normalizeSpaces (default: true)
       * @return string
      **/
      _getInnerText: function(e, normalizeSpaces) {
        normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
        var textContent = e.textContent.trim();
        if (normalizeSpaces) {
          return textContent.replace(this.REGEXPS.normalize, " ");
        }
        return textContent;
      },
      /**
       * Get the number of times a string s appears in the node e.
       *
       * @param Element
       * @param string - what to split on. Default is ","
       * @return number (integer)
      **/
      _getCharCount: function(e, s) {
        s = s || ",";
        return this._getInnerText(e).split(s).length - 1;
      },
      /**
       * Remove the style attribute on every e and under.
       * TODO: Test if getElementsByTagName(*) is faster.
       *
       * @param Element
       * @return void
      **/
      _cleanStyles: function(e) {
        if (!e || e.tagName.toLowerCase() === "svg")
          return;
        for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
          e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
        }
        if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
          e.removeAttribute("width");
          e.removeAttribute("height");
        }
        var cur = e.firstElementChild;
        while (cur !== null) {
          this._cleanStyles(cur);
          cur = cur.nextElementSibling;
        }
      },
      /**
       * Get the density of links as a percentage of the content
       * This is the amount of text that is inside a link divided by the total text in the node.
       *
       * @param Element
       * @return number (float)
      **/
      _getLinkDensity: function(element) {
        var textLength = this._getInnerText(element).length;
        if (textLength === 0)
          return 0;
        var linkLength = 0;
        this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
          var href = linkNode.getAttribute("href");
          var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
          linkLength += this._getInnerText(linkNode).length * coefficient;
        });
        return linkLength / textLength;
      },
      /**
       * Get an elements class/id weight. Uses regular expressions to tell if this
       * element looks good or bad.
       *
       * @param Element
       * @return number (Integer)
      **/
      _getClassWeight: function(e) {
        if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES))
          return 0;
        var weight = 0;
        if (typeof e.className === "string" && e.className !== "") {
          if (this.REGEXPS.negative.test(e.className))
            weight -= 25;
          if (this.REGEXPS.positive.test(e.className))
            weight += 25;
        }
        if (typeof e.id === "string" && e.id !== "") {
          if (this.REGEXPS.negative.test(e.id))
            weight -= 25;
          if (this.REGEXPS.positive.test(e.id))
            weight += 25;
        }
        return weight;
      },
      /**
       * Clean a node of all elements of type "tag".
       * (Unless it's a youtube/vimeo video. People love movies.)
       *
       * @param Element
       * @param string tag to clean
       * @return void
       **/
      _clean: function(e, tag) {
        var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;
        this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
          if (isEmbed) {
            for (var i = 0; i < element.attributes.length; i++) {
              if (this._allowedVideoRegex.test(element.attributes[i].value)) {
                return false;
              }
            }
            if (element.tagName === "object" && this._allowedVideoRegex.test(element.innerHTML)) {
              return false;
            }
          }
          return true;
        });
      },
      /**
       * Check if a given node has one of its ancestor tag name matching the
       * provided one.
       * @param  HTMLElement node
       * @param  String      tagName
       * @param  Number      maxDepth
       * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
       * @return Boolean
       */
      _hasAncestorTag: function(node, tagName, maxDepth, filterFn) {
        maxDepth = maxDepth || 3;
        tagName = tagName.toUpperCase();
        var depth = 0;
        while (node.parentNode) {
          if (maxDepth > 0 && depth > maxDepth)
            return false;
          if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode)))
            return true;
          node = node.parentNode;
          depth++;
        }
        return false;
      },
      /**
       * Return an object indicating how many rows and columns this table has.
       */
      _getRowAndColumnCount: function(table) {
        var rows = 0;
        var columns = 0;
        var trs = table.getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {
          var rowspan = trs[i].getAttribute("rowspan") || 0;
          if (rowspan) {
            rowspan = parseInt(rowspan, 10);
          }
          rows += rowspan || 1;
          var columnsInThisRow = 0;
          var cells = trs[i].getElementsByTagName("td");
          for (var j = 0; j < cells.length; j++) {
            var colspan = cells[j].getAttribute("colspan") || 0;
            if (colspan) {
              colspan = parseInt(colspan, 10);
            }
            columnsInThisRow += colspan || 1;
          }
          columns = Math.max(columns, columnsInThisRow);
        }
        return { rows, columns };
      },
      /**
       * Look for 'data' (as opposed to 'layout') tables, for which we use
       * similar checks as
       * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
       */
      _markDataTables: function(root2) {
        var tables = root2.getElementsByTagName("table");
        for (var i = 0; i < tables.length; i++) {
          var table = tables[i];
          var role = table.getAttribute("role");
          if (role == "presentation") {
            table._readabilityDataTable = false;
            continue;
          }
          var datatable = table.getAttribute("datatable");
          if (datatable == "0") {
            table._readabilityDataTable = false;
            continue;
          }
          var summary = table.getAttribute("summary");
          if (summary) {
            table._readabilityDataTable = true;
            continue;
          }
          var caption = table.getElementsByTagName("caption")[0];
          if (caption && caption.childNodes.length > 0) {
            table._readabilityDataTable = true;
            continue;
          }
          var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
          var descendantExists = function(tag) {
            return !!table.getElementsByTagName(tag)[0];
          };
          if (dataTableDescendants.some(descendantExists)) {
            this.log("Data table because found data-y descendant");
            table._readabilityDataTable = true;
            continue;
          }
          if (table.getElementsByTagName("table")[0]) {
            table._readabilityDataTable = false;
            continue;
          }
          var sizeInfo = this._getRowAndColumnCount(table);
          if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
            table._readabilityDataTable = true;
            continue;
          }
          table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
        }
      },
      /* convert images and figures that have properties like data-src into images that can be loaded without JS */
      _fixLazyImages: function(root2) {
        this._forEachNode(this._getAllNodesWithTag(root2, ["img", "picture", "figure"]), function(elem) {
          if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
            var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
            if (parts[1] === "image/svg+xml") {
              return;
            }
            var srcCouldBeRemoved = false;
            for (var i = 0; i < elem.attributes.length; i++) {
              var attr = elem.attributes[i];
              if (attr.name === "src") {
                continue;
              }
              if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                srcCouldBeRemoved = true;
                break;
              }
            }
            if (srcCouldBeRemoved) {
              var b64starts = elem.src.search(/base64\s*/i) + 7;
              var b64length = elem.src.length - b64starts;
              if (b64length < 133) {
                elem.removeAttribute("src");
              }
            }
          }
          if ((elem.src || elem.srcset && elem.srcset != "null") && elem.className.toLowerCase().indexOf("lazy") === -1) {
            return;
          }
          for (var j = 0; j < elem.attributes.length; j++) {
            attr = elem.attributes[j];
            if (attr.name === "src" || attr.name === "srcset" || attr.name === "alt") {
              continue;
            }
            var copyTo = null;
            if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
              copyTo = "srcset";
            } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
              copyTo = "src";
            }
            if (copyTo) {
              if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
                elem.setAttribute(copyTo, attr.value);
              } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
                var img = this._doc.createElement("img");
                img.setAttribute(copyTo, attr.value);
                elem.appendChild(img);
              }
            }
          }
        });
      },
      _getTextDensity: function(e, tags) {
        var textLength = this._getInnerText(e, true).length;
        if (textLength === 0) {
          return 0;
        }
        var childrenLength = 0;
        var children = this._getAllNodesWithTag(e, tags);
        this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
        return childrenLength / textLength;
      },
      /**
       * Clean an element of all tags of type "tag" if they look fishy.
       * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
       *
       * @return void
       **/
      _cleanConditionally: function(e, tag) {
        if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY))
          return;
        this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
          var isDataTable = function(t) {
            return t._readabilityDataTable;
          };
          var isList = tag === "ul" || tag === "ol";
          if (!isList) {
            var listLength = 0;
            var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
            this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
            isList = listLength / this._getInnerText(node).length > 0.9;
          }
          if (tag === "table" && isDataTable(node)) {
            return false;
          }
          if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
            return false;
          }
          if (this._hasAncestorTag(node, "code")) {
            return false;
          }
          var weight = this._getClassWeight(node);
          this.log("Cleaning Conditionally", node);
          var contentScore = 0;
          if (weight + contentScore < 0) {
            return true;
          }
          if (this._getCharCount(node, ",") < 10) {
            var p = node.getElementsByTagName("p").length;
            var img = node.getElementsByTagName("img").length;
            var li = node.getElementsByTagName("li").length - 100;
            var input = node.getElementsByTagName("input").length;
            var headingDensity = this._getTextDensity(node, ["h1", "h2", "h3", "h4", "h5", "h6"]);
            var embedCount = 0;
            var embeds = this._getAllNodesWithTag(node, ["object", "embed", "iframe"]);
            for (var i = 0; i < embeds.length; i++) {
              for (var j = 0; j < embeds[i].attributes.length; j++) {
                if (this._allowedVideoRegex.test(embeds[i].attributes[j].value)) {
                  return false;
                }
              }
              if (embeds[i].tagName === "object" && this._allowedVideoRegex.test(embeds[i].innerHTML)) {
                return false;
              }
              embedCount++;
            }
            var linkDensity = this._getLinkDensity(node);
            var contentLength = this._getInnerText(node).length;
            var haveToRemove = img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure") || !isList && li > p || input > Math.floor(p / 3) || !isList && headingDensity < 0.9 && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure") || !isList && weight < 25 && linkDensity > 0.2 || weight >= 25 && linkDensity > 0.5 || (embedCount === 1 && contentLength < 75 || embedCount > 1);
            if (isList && haveToRemove) {
              for (var x = 0; x < node.children.length; x++) {
                let child = node.children[x];
                if (child.children.length > 1) {
                  return haveToRemove;
                }
              }
              let li_count = node.getElementsByTagName("li").length;
              if (img == li_count) {
                return false;
              }
            }
            return haveToRemove;
          }
          return false;
        });
      },
      /**
       * Clean out elements that match the specified conditions
       *
       * @param Element
       * @param Function determines whether a node should be removed
       * @return void
       **/
      _cleanMatchedNodes: function(e, filter) {
        var endOfSearchMarkerNode = this._getNextNode(e, true);
        var next2 = this._getNextNode(e);
        while (next2 && next2 != endOfSearchMarkerNode) {
          if (filter.call(this, next2, next2.className + " " + next2.id)) {
            next2 = this._removeAndGetNext(next2);
          } else {
            next2 = this._getNextNode(next2);
          }
        }
      },
      /**
       * Clean out spurious headers from an Element.
       *
       * @param Element
       * @return void
      **/
      _cleanHeaders: function(e) {
        let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
        this._removeNodes(headingNodes, function(node) {
          let shouldRemove = this._getClassWeight(node) < 0;
          if (shouldRemove) {
            this.log("Removing header with low class weight:", node);
          }
          return shouldRemove;
        });
      },
      /**
       * Check if this node is an H1 or H2 element whose content is mostly
       * the same as the article title.
       *
       * @param Element  the node to check.
       * @return boolean indicating whether this is a title-like header.
       */
      _headerDuplicatesTitle: function(node) {
        if (node.tagName != "H1" && node.tagName != "H2") {
          return false;
        }
        var heading = this._getInnerText(node, false);
        this.log("Evaluating similarity of header:", heading, this._articleTitle);
        return this._textSimilarity(this._articleTitle, heading) > 0.75;
      },
      _flagIsActive: function(flag) {
        return (this._flags & flag) > 0;
      },
      _removeFlag: function(flag) {
        this._flags = this._flags & ~flag;
      },
      _isProbablyVisible: function(node) {
        return (!node.style || node.style.display != "none") && (!node.style || node.style.visibility != "hidden") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
      },
      /**
       * Runs readability.
       *
       * Workflow:
       *  1. Prep the document by removing script tags, css, etc.
       *  2. Build readability's DOM tree.
       *  3. Grab the article content from the current dom tree.
       *  4. Replace the current DOM tree with the new one.
       *  5. Read peacefully.
       *
       * @return void
       **/
      parse: function() {
        if (this._maxElemsToParse > 0) {
          var numTags = this._doc.getElementsByTagName("*").length;
          if (numTags > this._maxElemsToParse) {
            throw new Error("Aborting parsing document; " + numTags + " elements found");
          }
        }
        this._unwrapNoscriptImages(this._doc);
        var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
        this._removeScripts(this._doc);
        this._prepDocument();
        var metadata = this._getArticleMetadata(jsonLd);
        this._articleTitle = metadata.title;
        var articleContent = this._grabArticle();
        if (!articleContent)
          return null;
        this.log("Grabbed: " + articleContent.innerHTML);
        this._postProcessContent(articleContent);
        if (!metadata.excerpt) {
          var paragraphs = articleContent.getElementsByTagName("p");
          if (paragraphs.length > 0) {
            metadata.excerpt = paragraphs[0].textContent.trim();
          }
        }
        var textContent = articleContent.textContent;
        return {
          title: this._articleTitle,
          byline: metadata.byline || this._articleByline,
          dir: this._articleDir,
          lang: this._articleLang,
          content: this._serializer(articleContent),
          textContent,
          length: textContent.length,
          excerpt: metadata.excerpt,
          siteName: metadata.siteName || this._articleSiteName,
          publishedTime: metadata.publishedTime
        };
      }
    };
    if (typeof module2 === "object") {
      module2.exports = Readability2;
    }
  }
});

// node_modules/@mozilla/readability/Readability-readerable.js
var require_Readability_readerable = __commonJS({
  "node_modules/@mozilla/readability/Readability-readerable.js"(exports, module2) {
    var REGEXPS = {
      // NOTE: These two regular expressions are duplicated in
      // Readability.js. Please keep both copies in sync.
      unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
      okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i
    };
    function isNodeVisible(node) {
      return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
    }
    function isProbablyReaderable(doc, options = {}) {
      if (typeof options == "function") {
        options = { visibilityChecker: options };
      }
      var defaultOptions = { minScore: 20, minContentLength: 140, visibilityChecker: isNodeVisible };
      options = Object.assign(defaultOptions, options);
      var nodes = doc.querySelectorAll("p, pre, article");
      var brNodes = doc.querySelectorAll("div > br");
      if (brNodes.length) {
        var set = new Set(nodes);
        [].forEach.call(brNodes, function(node) {
          set.add(node.parentNode);
        });
        nodes = Array.from(set);
      }
      var score = 0;
      return [].some.call(nodes, function(node) {
        if (!options.visibilityChecker(node)) {
          return false;
        }
        var matchString = node.className + " " + node.id;
        if (REGEXPS.unlikelyCandidates.test(matchString) && !REGEXPS.okMaybeItsACandidate.test(matchString)) {
          return false;
        }
        if (node.matches("li p")) {
          return false;
        }
        var textContentLength = node.textContent.trim().length;
        if (textContentLength < options.minContentLength) {
          return false;
        }
        score += Math.sqrt(textContentLength - options.minContentLength);
        if (score > options.minScore) {
          return true;
        }
        return false;
      });
    }
    if (typeof module2 === "object") {
      module2.exports = isProbablyReaderable;
    }
  }
});

// node_modules/@mozilla/readability/index.js
var require_readability = __commonJS({
  "node_modules/@mozilla/readability/index.js"(exports, module2) {
    var Readability2 = require_Readability();
    var isProbablyReaderable = require_Readability_readerable();
    module2.exports = {
      Readability: Readability2,
      isProbablyReaderable
    };
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PulpitPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_readability = __toESM(require_readability());

// node_modules/turndown/lib/turndown.browser.es.js
function extend(destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key))
        destination[key] = source[key];
    }
  }
  return destination;
}
function repeat(character, count) {
  return Array(count + 1).join(character);
}
function trimLeadingNewlines(string) {
  return string.replace(/^\n*/, "");
}
function trimTrailingNewlines(string) {
  var indexEnd = string.length;
  while (indexEnd > 0 && string[indexEnd - 1] === "\n")
    indexEnd--;
  return string.substring(0, indexEnd);
}
function trimNewlines(string) {
  return trimTrailingNewlines(trimLeadingNewlines(string));
}
var blockElements = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
function isBlock(node) {
  return is(node, blockElements);
}
var voidElements = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
function isVoid(node) {
  return is(node, voidElements);
}
function hasVoid(node) {
  return has(node, voidElements);
}
var meaningfulWhenBlankElements = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
function isMeaningfulWhenBlank(node) {
  return is(node, meaningfulWhenBlankElements);
}
function hasMeaningfulWhenBlank(node) {
  return has(node, meaningfulWhenBlankElements);
}
function is(node, tagNames) {
  return tagNames.indexOf(node.nodeName) >= 0;
}
function has(node, tagNames) {
  return node.getElementsByTagName && tagNames.some(function(tagName) {
    return node.getElementsByTagName(tagName).length;
  });
}
var markdownEscapes = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
function escapeMarkdown(string) {
  return markdownEscapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
}
var rules = {};
rules.paragraph = {
  filter: "p",
  replacement: function(content) {
    return "\n\n" + content + "\n\n";
  }
};
rules.lineBreak = {
  filter: "br",
  replacement: function(content, node, options) {
    return options.br + "\n";
  }
};
rules.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));
    if (options.headingStyle === "setext" && hLevel < 3) {
      var underline = repeat(hLevel === 1 ? "=" : "-", content.length);
      return "\n\n" + content + "\n" + underline + "\n\n";
    } else {
      return "\n\n" + repeat("#", hLevel) + " " + content + "\n\n";
    }
  }
};
rules.blockquote = {
  filter: "blockquote",
  replacement: function(content) {
    content = trimNewlines(content).replace(/^/gm, "> ");
    return "\n\n" + content + "\n\n";
  }
};
rules.list = {
  filter: ["ul", "ol"],
  replacement: function(content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === "LI" && parent.lastElementChild === node) {
      return "\n" + content;
    } else {
      return "\n\n" + content + "\n\n";
    }
  }
};
rules.listItem = {
  filter: "li",
  replacement: function(content, node, options) {
    var prefix = options.bulletListMarker + "   ";
    var parent = node.parentNode;
    if (parent.nodeName === "OL") {
      var start = parent.getAttribute("start");
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + ".  ";
    }
    var isParagraph = /\n$/.test(content);
    content = trimNewlines(content) + (isParagraph ? "\n" : "");
    content = content.replace(/\n/gm, "\n" + " ".repeat(prefix.length));
    return prefix + content + (node.nextSibling ? "\n" : "");
  }
};
rules.indentedCodeBlock = {
  filter: function(node, options) {
    return options.codeBlockStyle === "indented" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
  },
  replacement: function(content, node, options) {
    return "\n\n    " + node.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
  }
};
rules.fencedCodeBlock = {
  filter: function(node, options) {
    return options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
  },
  replacement: function(content, node, options) {
    var className = node.firstChild.getAttribute("class") || "";
    var language = (className.match(/language-(\S+)/) || [null, ""])[1];
    var code = node.firstChild.textContent;
    var fenceChar = options.fence.charAt(0);
    var fenceSize = 3;
    var fenceInCodeRegex = new RegExp("^" + fenceChar + "{3,}", "gm");
    var match;
    while (match = fenceInCodeRegex.exec(code)) {
      if (match[0].length >= fenceSize) {
        fenceSize = match[0].length + 1;
      }
    }
    var fence = repeat(fenceChar, fenceSize);
    return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
  }
};
rules.horizontalRule = {
  filter: "hr",
  replacement: function(content, node, options) {
    return "\n\n" + options.hr + "\n\n";
  }
};
rules.inlineLink = {
  filter: function(node, options) {
    return options.linkStyle === "inlined" && node.nodeName === "A" && node.getAttribute("href");
  },
  replacement: function(content, node) {
    var href = escapeLinkDestination(node.getAttribute("href"));
    var title = escapeLinkTitle(cleanAttribute(node.getAttribute("title")));
    var titlePart = title ? ' "' + title + '"' : "";
    return "[" + content + "](" + href + titlePart + ")";
  }
};
rules.referenceLink = {
  filter: function(node, options) {
    return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
  },
  replacement: function(content, node, options) {
    var href = escapeLinkDestination(node.getAttribute("href"));
    var title = cleanAttribute(node.getAttribute("title"));
    if (title)
      title = ' "' + escapeLinkTitle(title) + '"';
    var replacement;
    var reference;
    switch (options.linkReferenceStyle) {
      case "collapsed":
        replacement = "[" + content + "][]";
        reference = "[" + content + "]: " + href + title;
        break;
      case "shortcut":
        replacement = "[" + content + "]";
        reference = "[" + content + "]: " + href + title;
        break;
      default:
        var id = this.references.length + 1;
        replacement = "[" + content + "][" + id + "]";
        reference = "[" + id + "]: " + href + title;
    }
    this.references.push(reference);
    return replacement;
  },
  references: [],
  append: function(options) {
    var references = "";
    if (this.references.length) {
      references = "\n\n" + this.references.join("\n") + "\n\n";
      this.references = [];
    }
    return references;
  }
};
rules.emphasis = {
  filter: ["em", "i"],
  replacement: function(content, node, options) {
    if (!content.trim())
      return "";
    return options.emDelimiter + content + options.emDelimiter;
  }
};
rules.strong = {
  filter: ["strong", "b"],
  replacement: function(content, node, options) {
    if (!content.trim())
      return "";
    return options.strongDelimiter + content + options.strongDelimiter;
  }
};
rules.code = {
  filter: function(node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;
    return node.nodeName === "CODE" && !isCodeBlock;
  },
  replacement: function(content) {
    if (!content)
      return "";
    content = content.replace(/\r?\n|\r/g, " ");
    var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? " " : "";
    var delimiter = "`";
    var matches = content.match(/`+/gm) || [];
    while (matches.indexOf(delimiter) !== -1)
      delimiter = delimiter + "`";
    return delimiter + extraSpace + content + extraSpace + delimiter;
  }
};
rules.image = {
  filter: "img",
  replacement: function(content, node) {
    var alt = escapeMarkdown(cleanAttribute(node.getAttribute("alt")));
    var src = escapeLinkDestination(node.getAttribute("src") || "");
    var title = cleanAttribute(node.getAttribute("title"));
    var titlePart = title ? ' "' + escapeLinkTitle(title) + '"' : "";
    return src ? "![" + alt + "](" + src + titlePart + ")" : "";
  }
};
function cleanAttribute(attribute) {
  return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
}
function escapeLinkDestination(destination) {
  var escaped = destination.replace(/([<>()])/g, "\\$1");
  return escaped.indexOf(" ") >= 0 ? "<" + escaped + ">" : escaped;
}
function escapeLinkTitle(title) {
  return title.replace(/"/g, '\\"');
}
function Rules(options) {
  this.options = options;
  this._keep = [];
  this._remove = [];
  this.blankRule = {
    replacement: options.blankReplacement
  };
  this.keepReplacement = options.keepReplacement;
  this.defaultRule = {
    replacement: options.defaultReplacement
  };
  this.array = [];
  for (var key in options.rules)
    this.array.push(options.rules[key]);
}
Rules.prototype = {
  add: function(key, rule) {
    this.array.unshift(rule);
  },
  keep: function(filter) {
    this._keep.unshift({
      filter,
      replacement: this.keepReplacement
    });
  },
  remove: function(filter) {
    this._remove.unshift({
      filter,
      replacement: function() {
        return "";
      }
    });
  },
  forNode: function(node) {
    if (node.isBlank)
      return this.blankRule;
    var rule;
    if (rule = findRule(this.array, node, this.options))
      return rule;
    if (rule = findRule(this._keep, node, this.options))
      return rule;
    if (rule = findRule(this._remove, node, this.options))
      return rule;
    return this.defaultRule;
  },
  forEach: function(fn) {
    for (var i = 0; i < this.array.length; i++)
      fn(this.array[i], i);
  }
};
function findRule(rules2, node, options) {
  for (var i = 0; i < rules2.length; i++) {
    var rule = rules2[i];
    if (filterValue(rule, node, options))
      return rule;
  }
  return void 0;
}
function filterValue(rule, node, options) {
  var filter = rule.filter;
  if (typeof filter === "string") {
    if (filter === node.nodeName.toLowerCase())
      return true;
  } else if (Array.isArray(filter)) {
    if (filter.indexOf(node.nodeName.toLowerCase()) > -1)
      return true;
  } else if (typeof filter === "function") {
    if (filter.call(rule, node, options))
      return true;
  } else {
    throw new TypeError("`filter` needs to be a string, array, or function");
  }
}
function collapseWhitespace(options) {
  var element = options.element;
  var isBlock2 = options.isBlock;
  var isVoid2 = options.isVoid;
  var isPre = options.isPre || function(node2) {
    return node2.nodeName === "PRE";
  };
  if (!element.firstChild || isPre(element))
    return;
  var prevText = null;
  var keepLeadingWs = false;
  var prev = null;
  var node = next(prev, element, isPre);
  while (node !== element) {
    if (node.nodeType === 3 || node.nodeType === 4) {
      var text = node.data.replace(/[ \r\n\t]+/g, " ");
      if ((!prevText || / $/.test(prevText.data)) && !keepLeadingWs && text[0] === " ") {
        text = text.substr(1);
      }
      if (!text) {
        node = remove(node);
        continue;
      }
      node.data = text;
      prevText = node;
    } else if (node.nodeType === 1) {
      if (isBlock2(node) || node.nodeName === "BR") {
        if (prevText) {
          prevText.data = prevText.data.replace(/ $/, "");
        }
        prevText = null;
        keepLeadingWs = false;
      } else if (isVoid2(node) || isPre(node)) {
        prevText = null;
        keepLeadingWs = true;
      } else if (prevText) {
        keepLeadingWs = false;
      }
    } else {
      node = remove(node);
      continue;
    }
    var nextNode = next(prev, node, isPre);
    prev = node;
    node = nextNode;
  }
  if (prevText) {
    prevText.data = prevText.data.replace(/ $/, "");
    if (!prevText.data) {
      remove(prevText);
    }
  }
}
function remove(node) {
  var next2 = node.nextSibling || node.parentNode;
  node.parentNode.removeChild(node);
  return next2;
}
function next(prev, current, isPre) {
  if (prev && prev.parentNode === current || isPre(current)) {
    return current.nextSibling || current.parentNode;
  }
  return current.firstChild || current.nextSibling || current.parentNode;
}
var root = typeof window !== "undefined" ? window : {};
function canParseHTMLNatively() {
  var Parser = root.DOMParser;
  var canParse = false;
  try {
    if (new Parser().parseFromString("", "text/html")) {
      canParse = true;
    }
  } catch (e) {
  }
  return canParse;
}
function createHTMLParser() {
  var Parser = function() {
  };
  {
    if (shouldUseActiveX()) {
      Parser.prototype.parseFromString = function(string) {
        var doc = new window.ActiveXObject("htmlfile");
        doc.designMode = "on";
        doc.open();
        doc.write(string);
        doc.close();
        return doc;
      };
    } else {
      Parser.prototype.parseFromString = function(string) {
        var doc = document.implementation.createHTMLDocument("");
        doc.open();
        doc.write(string);
        doc.close();
        return doc;
      };
    }
  }
  return Parser;
}
function shouldUseActiveX() {
  var useActiveX = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch (e) {
    if (root.ActiveXObject)
      useActiveX = true;
  }
  return useActiveX;
}
var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();
function RootNode(input, options) {
  var root2;
  if (typeof input === "string") {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + input + "</x-turndown>",
      "text/html"
    );
    root2 = doc.getElementById("turndown-root");
  } else {
    root2 = input.cloneNode(true);
  }
  collapseWhitespace({
    element: root2,
    isBlock,
    isVoid,
    isPre: options.preformattedCode ? isPreOrCode : null
  });
  return root2;
}
var _htmlParser;
function htmlParser() {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser;
}
function isPreOrCode(node) {
  return node.nodeName === "PRE" || node.nodeName === "CODE";
}
function Node(node, options) {
  node.isBlock = isBlock(node);
  node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;
  node.isBlank = isBlank(node);
  node.flankingWhitespace = flankingWhitespace(node, options);
  return node;
}
function isBlank(node) {
  return !isVoid(node) && !isMeaningfulWhenBlank(node) && /^\s*$/i.test(node.textContent) && !hasVoid(node) && !hasMeaningfulWhenBlank(node);
}
function flankingWhitespace(node, options) {
  if (node.isBlock || options.preformattedCode && node.isCode) {
    return {
      leading: "",
      trailing: ""
    };
  }
  var edges = edgeWhitespace(node.textContent);
  if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) {
    edges.leading = edges.leadingNonAscii;
  }
  if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) {
    edges.trailing = edges.trailingNonAscii;
  }
  return {
    leading: edges.leading,
    trailing: edges.trailing
  };
}
function edgeWhitespace(string) {
  var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return {
    leading: m[1],
    // whole string for whitespace-only strings
    leadingAscii: m[2],
    leadingNonAscii: m[3],
    trailing: m[4],
    // empty for whitespace-only strings
    trailingNonAscii: m[5],
    trailingAscii: m[6]
  };
}
function isFlankedByWhitespace(side, node, options) {
  var sibling;
  var regExp;
  var isFlanked;
  if (side === "left") {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }
  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue);
    } else if (options.preformattedCode && sibling.nodeName === "CODE") {
      isFlanked = false;
    } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
      isFlanked = regExp.test(sibling.textContent);
    }
  }
  return isFlanked;
}
var reduce = Array.prototype.reduce;
function TurndownService(options) {
  if (!(this instanceof TurndownService))
    return new TurndownService(options);
  var defaults = {
    rules,
    headingStyle: "setext",
    hr: "* * *",
    bulletListMarker: "*",
    codeBlockStyle: "indented",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
    br: "  ",
    preformattedCode: false,
    blankReplacement: function(content, node) {
      return node.isBlock ? "\n\n" : "";
    },
    keepReplacement: function(content, node) {
      return node.isBlock ? "\n\n" + node.outerHTML + "\n\n" : node.outerHTML;
    },
    defaultReplacement: function(content, node) {
      return node.isBlock ? "\n\n" + content + "\n\n" : content;
    }
  };
  this.options = extend({}, defaults, options);
  this.rules = new Rules(this.options);
}
TurndownService.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(input) {
    if (!canConvert(input)) {
      throw new TypeError(input + " is not a string, or an element/document/fragment node.");
    }
    if (input === "")
      return "";
    var output = process.call(this, new RootNode(input, this.options));
    return postProcess.call(this, output);
  },
  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The Turndown instance for chaining
   * @type Object
   */
  use: function(plugin) {
    if (Array.isArray(plugin)) {
      for (var i = 0; i < plugin.length; i++)
        this.use(plugin[i]);
    } else if (typeof plugin === "function") {
      plugin(this);
    } else {
      throw new TypeError("plugin must be a Function or an Array of Functions");
    }
    return this;
  },
  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  addRule: function(key, rule) {
    this.rules.add(key, rule);
    return this;
  },
  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  keep: function(filter) {
    this.rules.keep(filter);
    return this;
  },
  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  remove: function(filter) {
    this.rules.remove(filter);
    return this;
  },
  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */
  escape: function(string) {
    return escapeMarkdown(string);
  }
};
function process(parentNode) {
  var self = this;
  return reduce.call(parentNode.childNodes, function(output, node) {
    node = new Node(node, self.options);
    var replacement = "";
    if (node.nodeType === 3) {
      replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
    } else if (node.nodeType === 1) {
      replacement = replacementForNode.call(self, node);
    }
    return join(output, replacement);
  }, "");
}
function postProcess(output) {
  var self = this;
  this.rules.forEach(function(rule) {
    if (typeof rule.append === "function") {
      output = join(output, rule.append(self.options));
    }
  });
  return output.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function replacementForNode(node) {
  var rule = this.rules.forNode(node);
  var content = process.call(this, node);
  var whitespace = node.flankingWhitespace;
  if (whitespace.leading || whitespace.trailing)
    content = content.trim();
  return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
}
function join(output, replacement) {
  var s1 = trimTrailingNewlines(output);
  var s2 = trimLeadingNewlines(replacement);
  var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
  var separator = "\n\n".substring(0, nls);
  return s1 + separator + s2;
}
function canConvert(input) {
  return input != null && (typeof input === "string" || input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11));
}

// main.ts
var DEFAULT_SETTINGS = {
  saveFolder: "Pulpit",
  defaultTags: "",
  filenameTemplate: "{title}"
};
var PulpitPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
  }
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "save-url-from-clipboard",
      name: "Save URL from clipboard",
      callback: async () => {
        try {
          const url = (await navigator.clipboard.readText()).trim();
          if (!this.isValidUrl(url)) {
            new import_obsidian.Notice("Clipboard does not contain a valid URL.");
            return;
          }
          await this.clipUrl(url);
        } catch (err) {
          console.error("Pulpit: clipboard read failed", err);
          new import_obsidian.Notice("Could not read clipboard. Use the modal command instead.");
        }
      }
    });
    this.addCommand({
      id: "save-url-from-prompt",
      name: "Save URL (paste in dialog)",
      callback: () => {
        new UrlPromptModal(this.app, async (url) => {
          await this.clipUrl(url);
        }).open();
      }
    });
    this.addSettingTab(new PulpitSettingTab(this.app, this));
  }
  isValidUrl(text) {
    if (!text)
      return false;
    try {
      const u = new URL(text);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }
  async clipUrl(url) {
    const notice = new import_obsidian.Notice("Pulpit: fetching article...", 0);
    try {
      const html = await this.fetchPage(url);
      const article = this.extractArticle(html, url);
      if (!article) {
        notice.hide();
        new import_obsidian.Notice("Could not extract readable content from this page.");
        return;
      }
      const markdown = this.htmlToMarkdown(article.content);
      const note = this.composeNote(article, markdown, url);
      const file = await this.writeNote(article.title, note);
      notice.hide();
      new import_obsidian.Notice(`Saved: ${file.path}`);
      await this.app.workspace.openLinkText(file.path, "", false);
    } catch (err) {
      notice.hide();
      const message = err instanceof Error ? err.message : String(err);
      console.error("Pulpit error:", err);
      new import_obsidian.Notice(`Pulpit error: ${message}`);
    }
  }
  async fetchPage(url) {
    const response = await (0, import_obsidian.requestUrl)({ url, method: "GET" });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP ${response.status} from ${url}`);
    }
    return response.text;
  }
  extractArticle(html, baseUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const base = doc.createElement("base");
    base.href = baseUrl;
    if (doc.head) {
      doc.head.insertBefore(base, doc.head.firstChild);
    }
    const reader = new import_readability.Readability(doc);
    const result = reader.parse();
    if (!result || !result.content)
      return null;
    return {
      title: result.title || "Untitled",
      byline: result.byline,
      content: result.content,
      textContent: result.textContent || "",
      excerpt: result.excerpt
    };
  }
  htmlToMarkdown(html) {
    const turndown = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "*"
    });
    turndown.addRule("strikethrough", {
      filter: ["del", "s"],
      replacement: (content) => `~~${content}~~`
    });
    return turndown.turndown(html);
  }
  composeNote(article, body, url) {
    const now = /* @__PURE__ */ new Date();
    const isoDate = now.toISOString().slice(0, 10);
    const tags = this.settings.defaultTags.trim();
    const frontmatter = ["---"];
    frontmatter.push(`title: ${this.yamlEscape(article.title)}`);
    frontmatter.push(`source: ${url}`);
    if (article.byline) {
      frontmatter.push(`author: ${this.yamlEscape(article.byline)}`);
    }
    frontmatter.push(`date_saved: ${isoDate}`);
    if (tags) {
      frontmatter.push(`tags: [${tags.split(",").map((t) => t.trim()).filter(Boolean).join(", ")}]`);
    }
    frontmatter.push("---");
    frontmatter.push("");
    frontmatter.push(`# ${article.title}`);
    frontmatter.push("");
    if (article.byline) {
      frontmatter.push(`*By ${article.byline}*`);
      frontmatter.push("");
    }
    frontmatter.push(`Source: <${url}>`);
    frontmatter.push("");
    frontmatter.push("---");
    frontmatter.push("");
    frontmatter.push(body);
    return frontmatter.join("\n");
  }
  yamlEscape(s) {
    if (/[:\[\]{}#&*!|>'"%@`\n]/.test(s)) {
      return `"${s.replace(/"/g, '\\"')}"`;
    }
    return s;
  }
  async writeNote(title, content) {
    const folder = (0, import_obsidian.normalizePath)(this.settings.saveFolder.trim() || "Pulpit");
    if (!await this.app.vault.adapter.exists(folder)) {
      await this.app.vault.createFolder(folder);
    }
    const safeTitle = this.sanitizeFilename(title);
    let filename = `${folder}/${safeTitle}.md`;
    let counter = 1;
    while (await this.app.vault.adapter.exists(filename)) {
      filename = `${folder}/${safeTitle} (${counter}).md`;
      counter++;
    }
    return await this.app.vault.create(filename, content);
  }
  sanitizeFilename(name) {
    return name.replace(/[\\/:*?"<>|#^[\]]/g, "").replace(/\s+/g, " ").trim().slice(0, 100) || "Untitled";
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var UrlPromptModal = class extends import_obsidian.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Save URL with Pulpit" });
    const input = contentEl.createEl("input", {
      type: "url",
      placeholder: "https://example.com/article",
      cls: "pulpit-url-input"
    });
    input.style.width = "100%";
    input.style.padding = "8px";
    input.style.marginBottom = "12px";
    const buttonRow = contentEl.createDiv({ cls: "pulpit-button-row" });
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "8px";
    buttonRow.style.justifyContent = "flex-end";
    const cancelBtn = buttonRow.createEl("button", { text: "Cancel" });
    cancelBtn.onclick = () => this.close();
    const submitBtn = buttonRow.createEl("button", { text: "Save", cls: "mod-cta" });
    const submit = () => {
      const url = input.value.trim();
      if (!url) {
        new import_obsidian.Notice("Please enter a URL.");
        return;
      }
      try {
        const u = new URL(url);
        if (u.protocol !== "http:" && u.protocol !== "https:") {
          new import_obsidian.Notice("URL must use http or https.");
          return;
        }
      } catch {
        new import_obsidian.Notice("That doesn't look like a valid URL.");
        return;
      }
      this.close();
      this.onSubmit(url);
    };
    submitBtn.onclick = submit;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter")
        submit();
    });
    setTimeout(() => input.focus(), 50);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var PulpitSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Save folder").setDesc("Folder in your vault where saved articles are written. Will be created if it doesn't exist.").addText((text) => text.setPlaceholder("Pulpit").setValue(this.plugin.settings.saveFolder).onChange(async (value) => {
      this.plugin.settings.saveFolder = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("Default tags").setDesc("Comma-separated tags to add to every saved article. Leave blank for none.").addText((text) => text.setPlaceholder("clipped, reading").setValue(this.plugin.settings.defaultTags).onChange(async (value) => {
      this.plugin.settings.defaultTags = value;
      await this.plugin.saveSettings();
    }));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL0Btb3ppbGxhL3JlYWRhYmlsaXR5L1JlYWRhYmlsaXR5LmpzIiwgIm5vZGVfbW9kdWxlcy9AbW96aWxsYS9yZWFkYWJpbGl0eS9SZWFkYWJpbGl0eS1yZWFkZXJhYmxlLmpzIiwgIm5vZGVfbW9kdWxlcy9AbW96aWxsYS9yZWFkYWJpbGl0eS9pbmRleC5qcyIsICJtYWluLnRzIiwgIm5vZGVfbW9kdWxlcy90dXJuZG93bi9saWIvdHVybmRvd24uYnJvd3Nlci5lcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxMCBBcmM5MCBJbmNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIFRoaXMgY29kZSBpcyBoZWF2aWx5IGJhc2VkIG9uIEFyYzkwJ3MgcmVhZGFiaWxpdHkuanMgKDEuNy4xKSBzY3JpcHRcbiAqIGF2YWlsYWJsZSBhdDogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2FyYzkwbGFicy1yZWFkYWJpbGl0eVxuICovXG5cbi8qKlxuICogUHVibGljIGNvbnN0cnVjdG9yLlxuICogQHBhcmFtIHtIVE1MRG9jdW1lbnR9IGRvYyAgICAgVGhlIGRvY3VtZW50IHRvIHBhcnNlLlxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBSZWFkYWJpbGl0eShkb2MsIG9wdGlvbnMpIHtcbiAgLy8gSW4gc29tZSBvbGRlciB2ZXJzaW9ucywgcGVvcGxlIHBhc3NlZCBhIFVSSSBhcyB0aGUgZmlyc3QgYXJndW1lbnQuIENvcGU6XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgZG9jID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuICB9IGVsc2UgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmd1bWVudCB0byBSZWFkYWJpbGl0eSBjb25zdHJ1Y3RvciBzaG91bGQgYmUgYSBkb2N1bWVudCBvYmplY3QuXCIpO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuX2RvYyA9IGRvYztcbiAgdGhpcy5fZG9jSlNET01QYXJzZXIgPSB0aGlzLl9kb2MuZmlyc3RDaGlsZC5fX0pTRE9NUGFyc2VyX187XG4gIHRoaXMuX2FydGljbGVUaXRsZSA9IG51bGw7XG4gIHRoaXMuX2FydGljbGVCeWxpbmUgPSBudWxsO1xuICB0aGlzLl9hcnRpY2xlRGlyID0gbnVsbDtcbiAgdGhpcy5fYXJ0aWNsZVNpdGVOYW1lID0gbnVsbDtcbiAgdGhpcy5fYXR0ZW1wdHMgPSBbXTtcblxuICAvLyBDb25maWd1cmFibGUgb3B0aW9uc1xuICB0aGlzLl9kZWJ1ZyA9ICEhb3B0aW9ucy5kZWJ1ZztcbiAgdGhpcy5fbWF4RWxlbXNUb1BhcnNlID0gb3B0aW9ucy5tYXhFbGVtc1RvUGFyc2UgfHwgdGhpcy5ERUZBVUxUX01BWF9FTEVNU19UT19QQVJTRTtcbiAgdGhpcy5fbmJUb3BDYW5kaWRhdGVzID0gb3B0aW9ucy5uYlRvcENhbmRpZGF0ZXMgfHwgdGhpcy5ERUZBVUxUX05fVE9QX0NBTkRJREFURVM7XG4gIHRoaXMuX2NoYXJUaHJlc2hvbGQgPSBvcHRpb25zLmNoYXJUaHJlc2hvbGQgfHwgdGhpcy5ERUZBVUxUX0NIQVJfVEhSRVNIT0xEO1xuICB0aGlzLl9jbGFzc2VzVG9QcmVzZXJ2ZSA9IHRoaXMuQ0xBU1NFU19UT19QUkVTRVJWRS5jb25jYXQob3B0aW9ucy5jbGFzc2VzVG9QcmVzZXJ2ZSB8fCBbXSk7XG4gIHRoaXMuX2tlZXBDbGFzc2VzID0gISFvcHRpb25zLmtlZXBDbGFzc2VzO1xuICB0aGlzLl9zZXJpYWxpemVyID0gb3B0aW9ucy5zZXJpYWxpemVyIHx8IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGVsLmlubmVySFRNTDtcbiAgfTtcbiAgdGhpcy5fZGlzYWJsZUpTT05MRCA9ICEhb3B0aW9ucy5kaXNhYmxlSlNPTkxEO1xuICB0aGlzLl9hbGxvd2VkVmlkZW9SZWdleCA9IG9wdGlvbnMuYWxsb3dlZFZpZGVvUmVnZXggfHwgdGhpcy5SRUdFWFBTLnZpZGVvcztcblxuICAvLyBTdGFydCB3aXRoIGFsbCBmbGFncyBzZXRcbiAgdGhpcy5fZmxhZ3MgPSB0aGlzLkZMQUdfU1RSSVBfVU5MSUtFTFlTIHxcbiAgICAgICAgICAgICAgICB0aGlzLkZMQUdfV0VJR0hUX0NMQVNTRVMgfFxuICAgICAgICAgICAgICAgIHRoaXMuRkxBR19DTEVBTl9DT05ESVRJT05BTExZO1xuXG5cbiAgLy8gQ29udHJvbCB3aGV0aGVyIGxvZyBtZXNzYWdlcyBhcmUgc2VudCB0byB0aGUgY29uc29sZVxuICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICBsZXQgbG9nTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09IG5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgIHJldHVybiBgJHtub2RlLm5vZGVOYW1lfSAoXCIke25vZGUudGV4dENvbnRlbnR9XCIpYDtcbiAgICAgIH1cbiAgICAgIGxldCBhdHRyUGFpcnMgPSBBcnJheS5mcm9tKG5vZGUuYXR0cmlidXRlcyB8fCBbXSwgZnVuY3Rpb24oYXR0cikge1xuICAgICAgICByZXR1cm4gYCR7YXR0ci5uYW1lfT1cIiR7YXR0ci52YWx1ZX1cImA7XG4gICAgICB9KS5qb2luKFwiIFwiKTtcbiAgICAgIHJldHVybiBgPCR7bm9kZS5sb2NhbE5hbWV9ICR7YXR0clBhaXJzfT5gO1xuICAgIH07XG4gICAgdGhpcy5sb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cywgYXJnID0+IHtcbiAgICAgICAgICBpZiAoYXJnICYmIGFyZy5ub2RlVHlwZSA9PSB0aGlzLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ05vZGUoYXJnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfSk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIlJlYWRlcjogKFJlYWRhYmlsaXR5KVwiKTtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdW1wICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8qIGdsb2JhbCBkdW1wICovXG4gICAgICAgIHZhciBtc2cgPSBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgcmV0dXJuICh4ICYmIHgubm9kZU5hbWUpID8gbG9nTm9kZSh4KSA6IHg7XG4gICAgICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgICAgICBkdW1wKFwiUmVhZGVyOiAoUmVhZGFiaWxpdHkpIFwiICsgbXNnICsgXCJcXG5cIik7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uICgpIHt9O1xuICB9XG59XG5cblJlYWRhYmlsaXR5LnByb3RvdHlwZSA9IHtcbiAgRkxBR19TVFJJUF9VTkxJS0VMWVM6IDB4MSxcbiAgRkxBR19XRUlHSFRfQ0xBU1NFUzogMHgyLFxuICBGTEFHX0NMRUFOX0NPTkRJVElPTkFMTFk6IDB4NCxcblxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9ub2RlVHlwZVxuICBFTEVNRU5UX05PREU6IDEsXG4gIFRFWFRfTk9ERTogMyxcblxuICAvLyBNYXggbnVtYmVyIG9mIG5vZGVzIHN1cHBvcnRlZCBieSB0aGlzIHBhcnNlci4gRGVmYXVsdDogMCAobm8gbGltaXQpXG4gIERFRkFVTFRfTUFYX0VMRU1TX1RPX1BBUlNFOiAwLFxuXG4gIC8vIFRoZSBudW1iZXIgb2YgdG9wIGNhbmRpZGF0ZXMgdG8gY29uc2lkZXIgd2hlbiBhbmFseXNpbmcgaG93XG4gIC8vIHRpZ2h0IHRoZSBjb21wZXRpdGlvbiBpcyBhbW9uZyBjYW5kaWRhdGVzLlxuICBERUZBVUxUX05fVE9QX0NBTkRJREFURVM6IDUsXG5cbiAgLy8gRWxlbWVudCB0YWdzIHRvIHNjb3JlIGJ5IGRlZmF1bHQuXG4gIERFRkFVTFRfVEFHU19UT19TQ09SRTogXCJzZWN0aW9uLGgyLGgzLGg0LGg1LGg2LHAsdGQscHJlXCIudG9VcHBlckNhc2UoKS5zcGxpdChcIixcIiksXG5cbiAgLy8gVGhlIGRlZmF1bHQgbnVtYmVyIG9mIGNoYXJzIGFuIGFydGljbGUgbXVzdCBoYXZlIGluIG9yZGVyIHRvIHJldHVybiBhIHJlc3VsdFxuICBERUZBVUxUX0NIQVJfVEhSRVNIT0xEOiA1MDAsXG5cbiAgLy8gQWxsIG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb25zIGluIHVzZSB3aXRoaW4gcmVhZGFiaWxpdHkuXG4gIC8vIERlZmluZWQgdXAgaGVyZSBzbyB3ZSBkb24ndCBpbnN0YW50aWF0ZSB0aGVtIHJlcGVhdGVkbHkgaW4gbG9vcHMuXG4gIFJFR0VYUFM6IHtcbiAgICAvLyBOT1RFOiBUaGVzZSB0d28gcmVndWxhciBleHByZXNzaW9ucyBhcmUgZHVwbGljYXRlZCBpblxuICAgIC8vIFJlYWRhYmlsaXR5LXJlYWRlcmFibGUuanMuIFBsZWFzZSBrZWVwIGJvdGggY29waWVzIGluIHN5bmMuXG4gICAgdW5saWtlbHlDYW5kaWRhdGVzOiAvLWFkLXxhaTJodG1sfGJhbm5lcnxicmVhZGNydW1ic3xjb21ieHxjb21tZW50fGNvbW11bml0eXxjb3Zlci13cmFwfGRpc3F1c3xleHRyYXxmb290ZXJ8Z2RwcnxoZWFkZXJ8bGVnZW5kc3xtZW51fHJlbGF0ZWR8cmVtYXJrfHJlcGxpZXN8cnNzfHNob3V0Ym94fHNpZGViYXJ8c2t5c2NyYXBlcnxzb2NpYWx8c3BvbnNvcnxzdXBwbGVtZW50YWx8YWQtYnJlYWt8YWdlZ2F0ZXxwYWdpbmF0aW9ufHBhZ2VyfHBvcHVwfHlvbS1yZW1vdGUvaSxcbiAgICBva01heWJlSXRzQUNhbmRpZGF0ZTogL2FuZHxhcnRpY2xlfGJvZHl8Y29sdW1ufGNvbnRlbnR8bWFpbnxzaGFkb3cvaSxcblxuICAgIHBvc2l0aXZlOiAvYXJ0aWNsZXxib2R5fGNvbnRlbnR8ZW50cnl8aGVudHJ5fGgtZW50cnl8bWFpbnxwYWdlfHBhZ2luYXRpb258cG9zdHx0ZXh0fGJsb2d8c3RvcnkvaSxcbiAgICBuZWdhdGl2ZTogLy1hZC18aGlkZGVufF5oaWQkfCBoaWQkfCBoaWQgfF5oaWQgfGJhbm5lcnxjb21ieHxjb21tZW50fGNvbS18Y29udGFjdHxmb290fGZvb3Rlcnxmb290bm90ZXxnZHByfG1hc3RoZWFkfG1lZGlhfG1ldGF8b3V0YnJhaW58cHJvbW98cmVsYXRlZHxzY3JvbGx8c2hhcmV8c2hvdXRib3h8c2lkZWJhcnxza3lzY3JhcGVyfHNwb25zb3J8c2hvcHBpbmd8dGFnc3x0b29sfHdpZGdldC9pLFxuICAgIGV4dHJhbmVvdXM6IC9wcmludHxhcmNoaXZlfGNvbW1lbnR8ZGlzY3Vzc3xlW1xcLV0/bWFpbHxzaGFyZXxyZXBseXxhbGx8bG9naW58c2lnbnxzaW5nbGV8dXRpbGl0eS9pLFxuICAgIGJ5bGluZTogL2J5bGluZXxhdXRob3J8ZGF0ZWxpbmV8d3JpdHRlbmJ5fHAtYXV0aG9yL2ksXG4gICAgcmVwbGFjZUZvbnRzOiAvPChcXC8/KWZvbnRbXj5dKj4vZ2ksXG4gICAgbm9ybWFsaXplOiAvXFxzezIsfS9nLFxuICAgIHZpZGVvczogL1xcL1xcLyh3d3dcXC4pPygoZGFpbHltb3Rpb258eW91dHViZXx5b3V0dWJlLW5vY29va2llfHBsYXllclxcLnZpbWVvfHZcXC5xcSlcXC5jb218KGFyY2hpdmV8dXBsb2FkXFwud2lraW1lZGlhKVxcLm9yZ3xwbGF5ZXJcXC50d2l0Y2hcXC50dikvaSxcbiAgICBzaGFyZUVsZW1lbnRzOiAvKFxcYnxfKShzaGFyZXxzaGFyZWRhZGR5KShcXGJ8XykvaSxcbiAgICBuZXh0TGluazogLyhuZXh0fHdlaXRlcnxjb250aW51ZXw+KFteXFx8XXwkKXxcdTAwQkIoW15cXHxdfCQpKS9pLFxuICAgIHByZXZMaW5rOiAvKHByZXZ8ZWFybHxvbGR8bmV3fDx8XHUwMEFCKS9pLFxuICAgIHRva2VuaXplOiAvXFxXKy9nLFxuICAgIHdoaXRlc3BhY2U6IC9eXFxzKiQvLFxuICAgIGhhc0NvbnRlbnQ6IC9cXFMkLyxcbiAgICBoYXNoVXJsOiAvXiMuKy8sXG4gICAgc3Jjc2V0VXJsOiAvKFxcUyspKFxccytbXFxkLl0rW3h3XSk/KFxccyooPzosfCQpKS9nLFxuICAgIGI2NERhdGFVcmw6IC9eZGF0YTpcXHMqKFteXFxzOyxdKylcXHMqO1xccypiYXNlNjRcXHMqLC9pLFxuICAgIC8vIENvbW1hcyBhcyB1c2VkIGluIExhdGluLCBTaW5kaGksIENoaW5lc2UgYW5kIHZhcmlvdXMgb3RoZXIgc2NyaXB0cy5cbiAgICAvLyBzZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbW1hI0NvbW1hX3ZhcmlhbnRzXG4gICAgY29tbWFzOiAvXFx1MDAyQ3xcXHUwNjBDfFxcdUZFNTB8XFx1RkUxMHxcXHVGRTExfFxcdTJFNDF8XFx1MkUzNHxcXHUyRTMyfFxcdUZGMEMvZyxcbiAgICAvLyBTZWU6IGh0dHBzOi8vc2NoZW1hLm9yZy9BcnRpY2xlXG4gICAganNvbkxkQXJ0aWNsZVR5cGVzOiAvXkFydGljbGV8QWR2ZXJ0aXNlckNvbnRlbnRBcnRpY2xlfE5ld3NBcnRpY2xlfEFuYWx5c2lzTmV3c0FydGljbGV8QXNrUHVibGljTmV3c0FydGljbGV8QmFja2dyb3VuZE5ld3NBcnRpY2xlfE9waW5pb25OZXdzQXJ0aWNsZXxSZXBvcnRhZ2VOZXdzQXJ0aWNsZXxSZXZpZXdOZXdzQXJ0aWNsZXxSZXBvcnR8U2F0aXJpY2FsQXJ0aWNsZXxTY2hvbGFybHlBcnRpY2xlfE1lZGljYWxTY2hvbGFybHlBcnRpY2xlfFNvY2lhbE1lZGlhUG9zdGluZ3xCbG9nUG9zdGluZ3xMaXZlQmxvZ1Bvc3Rpbmd8RGlzY3Vzc2lvbkZvcnVtUG9zdGluZ3xUZWNoQXJ0aWNsZXxBUElSZWZlcmVuY2UkL1xuICB9LFxuXG4gIFVOTElLRUxZX1JPTEVTOiBbIFwibWVudVwiLCBcIm1lbnViYXJcIiwgXCJjb21wbGVtZW50YXJ5XCIsIFwibmF2aWdhdGlvblwiLCBcImFsZXJ0XCIsIFwiYWxlcnRkaWFsb2dcIiwgXCJkaWFsb2dcIiBdLFxuXG4gIERJVl9UT19QX0VMRU1TOiBuZXcgU2V0KFsgXCJCTE9DS1FVT1RFXCIsIFwiRExcIiwgXCJESVZcIiwgXCJJTUdcIiwgXCJPTFwiLCBcIlBcIiwgXCJQUkVcIiwgXCJUQUJMRVwiLCBcIlVMXCIgXSksXG5cbiAgQUxURVJfVE9fRElWX0VYQ0VQVElPTlM6IFtcIkRJVlwiLCBcIkFSVElDTEVcIiwgXCJTRUNUSU9OXCIsIFwiUFwiXSxcblxuICBQUkVTRU5UQVRJT05BTF9BVFRSSUJVVEVTOiBbIFwiYWxpZ25cIiwgXCJiYWNrZ3JvdW5kXCIsIFwiYmdjb2xvclwiLCBcImJvcmRlclwiLCBcImNlbGxwYWRkaW5nXCIsIFwiY2VsbHNwYWNpbmdcIiwgXCJmcmFtZVwiLCBcImhzcGFjZVwiLCBcInJ1bGVzXCIsIFwic3R5bGVcIiwgXCJ2YWxpZ25cIiwgXCJ2c3BhY2VcIiBdLFxuXG4gIERFUFJFQ0FURURfU0laRV9BVFRSSUJVVEVfRUxFTVM6IFsgXCJUQUJMRVwiLCBcIlRIXCIsIFwiVERcIiwgXCJIUlwiLCBcIlBSRVwiIF0sXG5cbiAgLy8gVGhlIGNvbW1lbnRlZCBvdXQgZWxlbWVudHMgcXVhbGlmeSBhcyBwaHJhc2luZyBjb250ZW50IGJ1dCB0ZW5kIHRvIGJlXG4gIC8vIHJlbW92ZWQgYnkgcmVhZGFiaWxpdHkgd2hlbiBwdXQgaW50byBwYXJhZ3JhcGhzLCBzbyB3ZSBpZ25vcmUgdGhlbSBoZXJlLlxuICBQSFJBU0lOR19FTEVNUzogW1xuICAgIC8vIFwiQ0FOVkFTXCIsIFwiSUZSQU1FXCIsIFwiU1ZHXCIsIFwiVklERU9cIixcbiAgICBcIkFCQlJcIiwgXCJBVURJT1wiLCBcIkJcIiwgXCJCRE9cIiwgXCJCUlwiLCBcIkJVVFRPTlwiLCBcIkNJVEVcIiwgXCJDT0RFXCIsIFwiREFUQVwiLFxuICAgIFwiREFUQUxJU1RcIiwgXCJERk5cIiwgXCJFTVwiLCBcIkVNQkVEXCIsIFwiSVwiLCBcIklNR1wiLCBcIklOUFVUXCIsIFwiS0JEXCIsIFwiTEFCRUxcIixcbiAgICBcIk1BUktcIiwgXCJNQVRIXCIsIFwiTUVURVJcIiwgXCJOT1NDUklQVFwiLCBcIk9CSkVDVFwiLCBcIk9VVFBVVFwiLCBcIlBST0dSRVNTXCIsIFwiUVwiLFxuICAgIFwiUlVCWVwiLCBcIlNBTVBcIiwgXCJTQ1JJUFRcIiwgXCJTRUxFQ1RcIiwgXCJTTUFMTFwiLCBcIlNQQU5cIiwgXCJTVFJPTkdcIiwgXCJTVUJcIixcbiAgICBcIlNVUFwiLCBcIlRFWFRBUkVBXCIsIFwiVElNRVwiLCBcIlZBUlwiLCBcIldCUlwiXG4gIF0sXG5cbiAgLy8gVGhlc2UgYXJlIHRoZSBjbGFzc2VzIHRoYXQgcmVhZGFiaWxpdHkgc2V0cyBpdHNlbGYuXG4gIENMQVNTRVNfVE9fUFJFU0VSVkU6IFsgXCJwYWdlXCIgXSxcblxuICAvLyBUaGVzZSBhcmUgdGhlIGxpc3Qgb2YgSFRNTCBlbnRpdGllcyB0aGF0IG5lZWQgdG8gYmUgZXNjYXBlZC5cbiAgSFRNTF9FU0NBUEVfTUFQOiB7XG4gICAgXCJsdFwiOiBcIjxcIixcbiAgICBcImd0XCI6IFwiPlwiLFxuICAgIFwiYW1wXCI6IFwiJlwiLFxuICAgIFwicXVvdFwiOiAnXCInLFxuICAgIFwiYXBvc1wiOiBcIidcIixcbiAgfSxcblxuICAvKipcbiAgICogUnVuIGFueSBwb3N0LXByb2Nlc3MgbW9kaWZpY2F0aW9ucyB0byBhcnRpY2xlIGNvbnRlbnQgYXMgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgKiovXG4gIF9wb3N0UHJvY2Vzc0NvbnRlbnQ6IGZ1bmN0aW9uKGFydGljbGVDb250ZW50KSB7XG4gICAgLy8gUmVhZGFiaWxpdHkgY2Fubm90IG9wZW4gcmVsYXRpdmUgdXJpcyBzbyB3ZSBjb252ZXJ0IHRoZW0gdG8gYWJzb2x1dGUgdXJpcy5cbiAgICB0aGlzLl9maXhSZWxhdGl2ZVVyaXMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy5fc2ltcGxpZnlOZXN0ZWRFbGVtZW50cyhhcnRpY2xlQ29udGVudCk7XG5cbiAgICBpZiAoIXRoaXMuX2tlZXBDbGFzc2VzKSB7XG4gICAgICAvLyBSZW1vdmUgY2xhc3Nlcy5cbiAgICAgIHRoaXMuX2NsZWFuQ2xhc3NlcyhhcnRpY2xlQ29udGVudCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyBvdmVyIGEgTm9kZUxpc3QsIGNhbGxzIGBmaWx0ZXJGbmAgZm9yIGVhY2ggbm9kZSBhbmQgcmVtb3ZlcyBub2RlXG4gICAqIGlmIGZ1bmN0aW9uIHJldHVybmVkIGB0cnVlYC5cbiAgICpcbiAgICogSWYgZnVuY3Rpb24gaXMgbm90IHBhc3NlZCwgcmVtb3ZlcyBhbGwgdGhlIG5vZGVzIGluIG5vZGUgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBub2RlcyB0byBvcGVyYXRlIG9uXG4gICAqIEBwYXJhbSBGdW5jdGlvbiBmaWx0ZXJGbiB0aGUgZnVuY3Rpb24gdG8gdXNlIGFzIGEgZmlsdGVyXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgX3JlbW92ZU5vZGVzOiBmdW5jdGlvbihub2RlTGlzdCwgZmlsdGVyRm4pIHtcbiAgICAvLyBBdm9pZCBldmVyIG9wZXJhdGluZyBvbiBsaXZlIG5vZGUgbGlzdHMuXG4gICAgaWYgKHRoaXMuX2RvY0pTRE9NUGFyc2VyICYmIG5vZGVMaXN0Ll9pc0xpdmVOb2RlTGlzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG8gbm90IHBhc3MgbGl2ZSBub2RlIGxpc3RzIHRvIF9yZW1vdmVOb2Rlc1wiKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IG5vZGVMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgbm9kZSA9IG5vZGVMaXN0W2ldO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoIWZpbHRlckZuIHx8IGZpbHRlckZuLmNhbGwodGhpcywgbm9kZSwgaSwgbm9kZUxpc3QpKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBhIE5vZGVMaXN0LCBhbmQgY2FsbHMgX3NldE5vZGVUYWcgZm9yIGVhY2ggbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBub2RlcyB0byBvcGVyYXRlIG9uXG4gICAqIEBwYXJhbSBTdHJpbmcgbmV3VGFnTmFtZSB0aGUgbmV3IHRhZyBuYW1lIHRvIHVzZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9yZXBsYWNlTm9kZVRhZ3M6IGZ1bmN0aW9uKG5vZGVMaXN0LCBuZXdUYWdOYW1lKSB7XG4gICAgLy8gQXZvaWQgZXZlciBvcGVyYXRpbmcgb24gbGl2ZSBub2RlIGxpc3RzLlxuICAgIGlmICh0aGlzLl9kb2NKU0RPTVBhcnNlciAmJiBub2RlTGlzdC5faXNMaXZlTm9kZUxpc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkRvIG5vdCBwYXNzIGxpdmUgbm9kZSBsaXN0cyB0byBfcmVwbGFjZU5vZGVUYWdzXCIpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZUxpc3QpIHtcbiAgICAgIHRoaXMuX3NldE5vZGVUYWcobm9kZSwgbmV3VGFnTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYSBOb2RlTGlzdCwgd2hpY2ggZG9lc24ndCBuYXRpdmVseSBmdWxseSBpbXBsZW1lbnQgdGhlIEFycmF5XG4gICAqIGludGVyZmFjZS5cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUgY3VycmVudCBvYmplY3QgY29udGV4dCBpcyBhcHBsaWVkIHRvIHRoZSBwcm92aWRlZFxuICAgKiBpdGVyYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBOb2RlTGlzdC5cbiAgICogQHBhcmFtICBGdW5jdGlvbiBmbiAgICAgICBUaGUgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfZm9yRWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGVMaXN0LCBmbikge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZUxpc3QsIGZuLCB0aGlzKTtcbiAgfSxcblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGEgTm9kZUxpc3QsIGFuZCByZXR1cm4gdGhlIGZpcnN0IG5vZGUgdGhhdCBwYXNzZXNcbiAgICogdGhlIHN1cHBsaWVkIHRlc3QgZnVuY3Rpb25cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUgY3VycmVudCBvYmplY3QgY29udGV4dCBpcyBhcHBsaWVkIHRvIHRoZSBwcm92aWRlZFxuICAgKiB0ZXN0IGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBOb2RlTGlzdC5cbiAgICogQHBhcmFtICBGdW5jdGlvbiBmbiAgICAgICBUaGUgdGVzdCBmdW5jdGlvbi5cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfZmluZE5vZGU6IGZ1bmN0aW9uKG5vZGVMaXN0LCBmbikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKG5vZGVMaXN0LCBmbiwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIE5vZGVMaXN0LCByZXR1cm4gdHJ1ZSBpZiBhbnkgb2YgdGhlIHByb3ZpZGVkIGl0ZXJhdGVcbiAgICogZnVuY3Rpb24gY2FsbHMgcmV0dXJucyB0cnVlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqXG4gICAqIEZvciBjb252ZW5pZW5jZSwgdGhlIGN1cnJlbnQgb2JqZWN0IGNvbnRleHQgaXMgYXBwbGllZCB0byB0aGVcbiAgICogcHJvdmlkZWQgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICBOb2RlTGlzdCBub2RlTGlzdCBUaGUgTm9kZUxpc3QuXG4gICAqIEBwYXJhbSAgRnVuY3Rpb24gZm4gICAgICAgVGhlIGl0ZXJhdGUgZnVuY3Rpb24uXG4gICAqIEByZXR1cm4gQm9vbGVhblxuICAgKi9cbiAgX3NvbWVOb2RlOiBmdW5jdGlvbihub2RlTGlzdCwgZm4pIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNvbWUuY2FsbChub2RlTGlzdCwgZm4sIHRoaXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYSBOb2RlTGlzdCwgcmV0dXJuIHRydWUgaWYgYWxsIG9mIHRoZSBwcm92aWRlZCBpdGVyYXRlXG4gICAqIGZ1bmN0aW9uIGNhbGxzIHJldHVybiB0cnVlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqXG4gICAqIEZvciBjb252ZW5pZW5jZSwgdGhlIGN1cnJlbnQgb2JqZWN0IGNvbnRleHQgaXMgYXBwbGllZCB0byB0aGVcbiAgICogcHJvdmlkZWQgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICBOb2RlTGlzdCBub2RlTGlzdCBUaGUgTm9kZUxpc3QuXG4gICAqIEBwYXJhbSAgRnVuY3Rpb24gZm4gICAgICAgVGhlIGl0ZXJhdGUgZnVuY3Rpb24uXG4gICAqIEByZXR1cm4gQm9vbGVhblxuICAgKi9cbiAgX2V2ZXJ5Tm9kZTogZnVuY3Rpb24obm9kZUxpc3QsIGZuKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5ldmVyeS5jYWxsKG5vZGVMaXN0LCBmbiwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbmNhdCBhbGwgbm9kZWxpc3RzIHBhc3NlZCBhcyBhcmd1bWVudHMuXG4gICAqXG4gICAqIEByZXR1cm4gLi4uTm9kZUxpc3RcbiAgICogQHJldHVybiBBcnJheVxuICAgKi9cbiAgX2NvbmNhdE5vZGVMaXN0czogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciBub2RlTGlzdHMgPSBhcmdzLm1hcChmdW5jdGlvbihsaXN0KSB7XG4gICAgICByZXR1cm4gc2xpY2UuY2FsbChsaXN0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgbm9kZUxpc3RzKTtcbiAgfSxcblxuICBfZ2V0QWxsTm9kZXNXaXRoVGFnOiBmdW5jdGlvbihub2RlLCB0YWdOYW1lcykge1xuICAgIGlmIChub2RlLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAgIHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwodGFnTmFtZXMuam9pbihcIixcIikpO1xuICAgIH1cbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCB0YWdOYW1lcy5tYXAoZnVuY3Rpb24odGFnKSB7XG4gICAgICB2YXIgY29sbGVjdGlvbiA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pID8gY29sbGVjdGlvbiA6IEFycmF5LmZyb20oY29sbGVjdGlvbik7XG4gICAgfSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjbGFzcz1cIlwiIGF0dHJpYnV0ZSBmcm9tIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIGdpdmVuXG4gICAqIHN1YnRyZWUsIGV4Y2VwdCB0aG9zZSB0aGF0IG1hdGNoIENMQVNTRVNfVE9fUFJFU0VSVkUgYW5kXG4gICAqIHRoZSBjbGFzc2VzVG9QcmVzZXJ2ZSBhcnJheSBmcm9tIHRoZSBvcHRpb25zIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfY2xlYW5DbGFzc2VzOiBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIGNsYXNzZXNUb1ByZXNlcnZlID0gdGhpcy5fY2xhc3Nlc1RvUHJlc2VydmU7XG4gICAgdmFyIGNsYXNzTmFtZSA9IChub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG4gICAgICAuc3BsaXQoL1xccysvKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbihjbHMpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXNUb1ByZXNlcnZlLmluZGV4T2YoY2xzKSAhPSAtMTtcbiAgICAgIH0pXG4gICAgICAuam9pbihcIiBcIik7XG5cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgfVxuXG4gICAgZm9yIChub2RlID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDsgbm9kZTsgbm9kZSA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICB0aGlzLl9jbGVhbkNsYXNzZXMobm9kZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBlYWNoIDxhPiBhbmQgPGltZz4gdXJpIGluIHRoZSBnaXZlbiBlbGVtZW50IHRvIGFuIGFic29sdXRlIFVSSSxcbiAgICogaWdub3JpbmcgI3JlZiBVUklzLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9maXhSZWxhdGl2ZVVyaXM6IGZ1bmN0aW9uKGFydGljbGVDb250ZW50KSB7XG4gICAgdmFyIGJhc2VVUkkgPSB0aGlzLl9kb2MuYmFzZVVSSTtcbiAgICB2YXIgZG9jdW1lbnRVUkkgPSB0aGlzLl9kb2MuZG9jdW1lbnRVUkk7XG4gICAgZnVuY3Rpb24gdG9BYnNvbHV0ZVVSSSh1cmkpIHtcbiAgICAgIC8vIExlYXZlIGhhc2ggbGlua3MgYWxvbmUgaWYgdGhlIGJhc2UgVVJJIG1hdGNoZXMgdGhlIGRvY3VtZW50IFVSSTpcbiAgICAgIGlmIChiYXNlVVJJID09IGRvY3VtZW50VVJJICYmIHVyaS5jaGFyQXQoMCkgPT0gXCIjXCIpIHtcbiAgICAgICAgcmV0dXJuIHVyaTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlLCByZXNvbHZlIGFnYWluc3QgYmFzZSBVUkk6XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFVSTCh1cmksIGJhc2VVUkkpLmhyZWY7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAvLyBTb21ldGhpbmcgd2VudCB3cm9uZywganVzdCByZXR1cm4gdGhlIG9yaWdpbmFsOlxuICAgICAgfVxuICAgICAgcmV0dXJuIHVyaTtcbiAgICB9XG5cbiAgICB2YXIgbGlua3MgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcImFcIl0pO1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKGxpbmtzLCBmdW5jdGlvbihsaW5rKSB7XG4gICAgICB2YXIgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgIGlmIChocmVmKSB7XG4gICAgICAgIC8vIFJlbW92ZSBsaW5rcyB3aXRoIGphdmFzY3JpcHQ6IFVSSXMsIHNpbmNlXG4gICAgICAgIC8vIHRoZXkgd29uJ3Qgd29yayBhZnRlciBzY3JpcHRzIGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UuXG4gICAgICAgIGlmIChocmVmLmluZGV4T2YoXCJqYXZhc2NyaXB0OlwiKSA9PT0gMCkge1xuICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIG9ubHkgY29udGFpbnMgc2ltcGxlIHRleHQgY29udGVudCwgaXQgY2FuIGJlIGNvbnZlcnRlZCB0byBhIHRleHQgbm9kZVxuICAgICAgICAgIGlmIChsaW5rLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmIGxpbmsuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gdGhpcy5URVhUX05PREUpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gdGhpcy5fZG9jLmNyZWF0ZVRleHROb2RlKGxpbmsudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgbGluay5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZXh0LCBsaW5rKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmsgaGFzIG11bHRpcGxlIGNoaWxkcmVuLCB0aGV5IHNob3VsZCBhbGwgYmUgcHJlc2VydmVkXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgd2hpbGUgKGxpbmsuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGluay5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmsucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGFpbmVyLCBsaW5rKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHRvQWJzb2x1dGVVUkkoaHJlZikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgbWVkaWFzID0gdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGFydGljbGVDb250ZW50LCBbXG4gICAgICBcImltZ1wiLCBcInBpY3R1cmVcIiwgXCJmaWd1cmVcIiwgXCJ2aWRlb1wiLCBcImF1ZGlvXCIsIFwic291cmNlXCJcbiAgICBdKTtcblxuICAgIHRoaXMuX2ZvckVhY2hOb2RlKG1lZGlhcywgZnVuY3Rpb24obWVkaWEpIHtcbiAgICAgIHZhciBzcmMgPSBtZWRpYS5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gICAgICB2YXIgcG9zdGVyID0gbWVkaWEuZ2V0QXR0cmlidXRlKFwicG9zdGVyXCIpO1xuICAgICAgdmFyIHNyY3NldCA9IG1lZGlhLmdldEF0dHJpYnV0ZShcInNyY3NldFwiKTtcblxuICAgICAgaWYgKHNyYykge1xuICAgICAgICBtZWRpYS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdG9BYnNvbHV0ZVVSSShzcmMpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc3Rlcikge1xuICAgICAgICBtZWRpYS5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgdG9BYnNvbHV0ZVVSSShwb3N0ZXIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICB2YXIgbmV3U3Jjc2V0ID0gc3Jjc2V0LnJlcGxhY2UodGhpcy5SRUdFWFBTLnNyY3NldFVybCwgZnVuY3Rpb24oXywgcDEsIHAyLCBwMykge1xuICAgICAgICAgIHJldHVybiB0b0Fic29sdXRlVVJJKHAxKSArIChwMiB8fCBcIlwiKSArIHAzO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZWRpYS5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiwgbmV3U3Jjc2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBfc2ltcGxpZnlOZXN0ZWRFbGVtZW50czogZnVuY3Rpb24oYXJ0aWNsZUNvbnRlbnQpIHtcbiAgICB2YXIgbm9kZSA9IGFydGljbGVDb250ZW50O1xuXG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLnBhcmVudE5vZGUgJiYgW1wiRElWXCIsIFwiU0VDVElPTlwiXS5pbmNsdWRlcyhub2RlLnRhZ05hbWUpICYmICEobm9kZS5pZCAmJiBub2RlLmlkLnN0YXJ0c1dpdGgoXCJyZWFkYWJpbGl0eVwiKSkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRWxlbWVudFdpdGhvdXRDb250ZW50KG5vZGUpKSB7XG4gICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChub2RlLCBcIkRJVlwiKSB8fCB0aGlzLl9oYXNTaW5nbGVUYWdJbnNpZGVFbGVtZW50KG5vZGUsIFwiU0VDVElPTlwiKSkge1xuICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZSwgbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjaGlsZCwgbm9kZSk7XG4gICAgICAgICAgbm9kZSA9IGNoaWxkO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5vZGUgPSB0aGlzLl9nZXROZXh0Tm9kZShub2RlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYXJ0aWNsZSB0aXRsZSBhcyBhbiBIMS5cbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICoqL1xuICBfZ2V0QXJ0aWNsZVRpdGxlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jID0gdGhpcy5fZG9jO1xuICAgIHZhciBjdXJUaXRsZSA9IFwiXCI7XG4gICAgdmFyIG9yaWdUaXRsZSA9IFwiXCI7XG5cbiAgICB0cnkge1xuICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGUgPSBkb2MudGl0bGUudHJpbSgpO1xuXG4gICAgICAvLyBJZiB0aGV5IGhhZCBhbiBlbGVtZW50IHdpdGggaWQgXCJ0aXRsZVwiIGluIHRoZWlyIEhUTUxcbiAgICAgIGlmICh0eXBlb2YgY3VyVGl0bGUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRpdGxlXCIpWzBdKTtcbiAgICB9IGNhdGNoIChlKSB7LyogaWdub3JlIGV4Y2VwdGlvbnMgc2V0dGluZyB0aGUgdGl0bGUuICovfVxuXG4gICAgdmFyIHRpdGxlSGFkSGllcmFyY2hpY2FsU2VwYXJhdG9ycyA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuc3BsaXQoL1xccysvKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHNlcGFyYXRvciBpbiB0aGUgdGl0bGUsIGZpcnN0IHJlbW92ZSB0aGUgZmluYWwgcGFydFxuICAgIGlmICgoLyBbXFx8XFwtXFxcXFxcLz5cdTAwQkJdIC8pLnRlc3QoY3VyVGl0bGUpKSB7XG4gICAgICB0aXRsZUhhZEhpZXJhcmNoaWNhbFNlcGFyYXRvcnMgPSAvIFtcXFxcXFwvPlx1MDBCQl0gLy50ZXN0KGN1clRpdGxlKTtcbiAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlLnJlcGxhY2UoLyguKilbXFx8XFwtXFxcXFxcLz5cdTAwQkJdIC4qL2dpLCBcIiQxXCIpO1xuXG4gICAgICAvLyBJZiB0aGUgcmVzdWx0aW5nIHRpdGxlIGlzIHRvbyBzaG9ydCAoMyB3b3JkcyBvciBmZXdlciksIHJlbW92ZVxuICAgICAgLy8gdGhlIGZpcnN0IHBhcnQgaW5zdGVhZDpcbiAgICAgIGlmICh3b3JkQ291bnQoY3VyVGl0bGUpIDwgMylcbiAgICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGUucmVwbGFjZSgvW15cXHxcXC1cXFxcXFwvPlx1MDBCQl0qW1xcfFxcLVxcXFxcXC8+XHUwMEJCXSguKikvZ2ksIFwiJDFcIik7XG4gICAgfSBlbHNlIGlmIChjdXJUaXRsZS5pbmRleE9mKFwiOiBcIikgIT09IC0xKSB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGFuIGhlYWRpbmcgY29udGFpbmluZyB0aGlzIGV4YWN0IHN0cmluZywgc28gd2VcbiAgICAgIC8vIGNvdWxkIGFzc3VtZSBpdCdzIHRoZSBmdWxsIHRpdGxlLlxuICAgICAgdmFyIGhlYWRpbmdzID0gdGhpcy5fY29uY2F0Tm9kZUxpc3RzKFxuICAgICAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoMVwiKSxcbiAgICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIilcbiAgICAgICk7XG4gICAgICB2YXIgdHJpbW1lZFRpdGxlID0gY3VyVGl0bGUudHJpbSgpO1xuICAgICAgdmFyIG1hdGNoID0gdGhpcy5fc29tZU5vZGUoaGVhZGluZ3MsIGZ1bmN0aW9uKGhlYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGhlYWRpbmcudGV4dENvbnRlbnQudHJpbSgpID09PSB0cmltbWVkVGl0bGU7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgd2UgZG9uJ3QsIGxldCdzIGV4dHJhY3QgdGhlIHRpdGxlIG91dCBvZiB0aGUgb3JpZ2luYWwgdGl0bGUgc3RyaW5nLlxuICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICBjdXJUaXRsZSA9IG9yaWdUaXRsZS5zdWJzdHJpbmcob3JpZ1RpdGxlLmxhc3RJbmRleE9mKFwiOlwiKSArIDEpO1xuXG4gICAgICAgIC8vIElmIHRoZSB0aXRsZSBpcyBub3cgdG9vIHNob3J0LCB0cnkgdGhlIGZpcnN0IGNvbG9uIGluc3RlYWQ6XG4gICAgICAgIGlmICh3b3JkQ291bnQoY3VyVGl0bGUpIDwgMykge1xuICAgICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlLnN1YnN0cmluZyhvcmlnVGl0bGUuaW5kZXhPZihcIjpcIikgKyAxKTtcbiAgICAgICAgICAvLyBCdXQgaWYgd2UgaGF2ZSB0b28gbWFueSB3b3JkcyBiZWZvcmUgdGhlIGNvbG9uIHRoZXJlJ3Mgc29tZXRoaW5nIHdlaXJkXG4gICAgICAgICAgLy8gd2l0aCB0aGUgdGl0bGVzIGFuZCB0aGUgSCB0YWdzIHNvIGxldCdzIGp1c3QgdXNlIHRoZSBvcmlnaW5hbCB0aXRsZSBpbnN0ZWFkXG4gICAgICAgIH0gZWxzZSBpZiAod29yZENvdW50KG9yaWdUaXRsZS5zdWJzdHIoMCwgb3JpZ1RpdGxlLmluZGV4T2YoXCI6XCIpKSkgPiA1KSB7XG4gICAgICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGN1clRpdGxlLmxlbmd0aCA+IDE1MCB8fCBjdXJUaXRsZS5sZW5ndGggPCAxNSkge1xuICAgICAgdmFyIGhPbmVzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDFcIik7XG5cbiAgICAgIGlmIChoT25lcy5sZW5ndGggPT09IDEpXG4gICAgICAgIGN1clRpdGxlID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGhPbmVzWzBdKTtcbiAgICB9XG5cbiAgICBjdXJUaXRsZSA9IGN1clRpdGxlLnRyaW0oKS5yZXBsYWNlKHRoaXMuUkVHRVhQUy5ub3JtYWxpemUsIFwiIFwiKTtcbiAgICAvLyBJZiB3ZSBub3cgaGF2ZSA0IHdvcmRzIG9yIGZld2VyIGFzIG91ciB0aXRsZSwgYW5kIGVpdGhlciBub1xuICAgIC8vICdoaWVyYXJjaGljYWwnIHNlcGFyYXRvcnMgKFxcLCAvLCA+IG9yIFx1MDBCQikgd2VyZSBmb3VuZCBpbiB0aGUgb3JpZ2luYWxcbiAgICAvLyB0aXRsZSBvciB3ZSBkZWNyZWFzZWQgdGhlIG51bWJlciBvZiB3b3JkcyBieSBtb3JlIHRoYW4gMSB3b3JkLCB1c2VcbiAgICAvLyB0aGUgb3JpZ2luYWwgdGl0bGUuXG4gICAgdmFyIGN1clRpdGxlV29yZENvdW50ID0gd29yZENvdW50KGN1clRpdGxlKTtcbiAgICBpZiAoY3VyVGl0bGVXb3JkQ291bnQgPD0gNCAmJlxuICAgICAgICAoIXRpdGxlSGFkSGllcmFyY2hpY2FsU2VwYXJhdG9ycyB8fFxuICAgICAgICAgY3VyVGl0bGVXb3JkQ291bnQgIT0gd29yZENvdW50KG9yaWdUaXRsZS5yZXBsYWNlKC9bXFx8XFwtXFxcXFxcLz5cdTAwQkJdKy9nLCBcIlwiKSkgLSAxKSkge1xuICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1clRpdGxlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBIVE1MIGRvY3VtZW50IGZvciByZWFkYWJpbGl0eSB0byBzY3JhcGUgaXQuXG4gICAqIFRoaXMgaW5jbHVkZXMgdGhpbmdzIGxpa2Ugc3RyaXBwaW5nIGphdmFzY3JpcHQsIENTUywgYW5kIGhhbmRsaW5nIHRlcnJpYmxlIG1hcmt1cC5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX3ByZXBEb2N1bWVudDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRvYyA9IHRoaXMuX2RvYztcblxuICAgIC8vIFJlbW92ZSBhbGwgc3R5bGUgdGFncyBpbiBoZWFkXG4gICAgdGhpcy5fcmVtb3ZlTm9kZXModGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGRvYywgW1wic3R5bGVcIl0pKTtcblxuICAgIGlmIChkb2MuYm9keSkge1xuICAgICAgdGhpcy5fcmVwbGFjZUJycyhkb2MuYm9keSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVwbGFjZU5vZGVUYWdzKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhkb2MsIFtcImZvbnRcIl0pLCBcIlNQQU5cIik7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBuZXh0IG5vZGUsIHN0YXJ0aW5nIGZyb20gdGhlIGdpdmVuIG5vZGUsIGFuZCBpZ25vcmluZ1xuICAgKiB3aGl0ZXNwYWNlIGluIGJldHdlZW4uIElmIHRoZSBnaXZlbiBub2RlIGlzIGFuIGVsZW1lbnQsIHRoZSBzYW1lIG5vZGUgaXNcbiAgICogcmV0dXJuZWQuXG4gICAqL1xuICBfbmV4dE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIG5leHQgPSBub2RlO1xuICAgIHdoaWxlIChuZXh0XG4gICAgICAgICYmIChuZXh0Lm5vZGVUeXBlICE9IHRoaXMuRUxFTUVOVF9OT0RFKVxuICAgICAgICAmJiB0aGlzLlJFR0VYUFMud2hpdGVzcGFjZS50ZXN0KG5leHQudGV4dENvbnRlbnQpKSB7XG4gICAgICBuZXh0ID0gbmV4dC5uZXh0U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIDIgb3IgbW9yZSBzdWNjZXNzaXZlIDxicj4gZWxlbWVudHMgd2l0aCBhIHNpbmdsZSA8cD4uXG4gICAqIFdoaXRlc3BhY2UgYmV0d2VlbiA8YnI+IGVsZW1lbnRzIGFyZSBpZ25vcmVkLiBGb3IgZXhhbXBsZTpcbiAgICogICA8ZGl2PmZvbzxicj5iYXI8YnI+IDxicj48YnI+YWJjPC9kaXY+XG4gICAqIHdpbGwgYmVjb21lOlxuICAgKiAgIDxkaXY+Zm9vPGJyPmJhcjxwPmFiYzwvcD48L2Rpdj5cbiAgICovXG4gIF9yZXBsYWNlQnJzOiBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhlbGVtLCBbXCJiclwiXSksIGZ1bmN0aW9uKGJyKSB7XG4gICAgICB2YXIgbmV4dCA9IGJyLm5leHRTaWJsaW5nO1xuXG4gICAgICAvLyBXaGV0aGVyIDIgb3IgbW9yZSA8YnI+IGVsZW1lbnRzIGhhdmUgYmVlbiBmb3VuZCBhbmQgcmVwbGFjZWQgd2l0aCBhXG4gICAgICAvLyA8cD4gYmxvY2suXG4gICAgICB2YXIgcmVwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgLy8gSWYgd2UgZmluZCBhIDxicj4gY2hhaW4sIHJlbW92ZSB0aGUgPGJyPnMgdW50aWwgd2UgaGl0IGFub3RoZXIgbm9kZVxuICAgICAgLy8gb3Igbm9uLXdoaXRlc3BhY2UuIFRoaXMgbGVhdmVzIGJlaGluZCB0aGUgZmlyc3QgPGJyPiBpbiB0aGUgY2hhaW5cbiAgICAgIC8vICh3aGljaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggYSA8cD4gbGF0ZXIpLlxuICAgICAgd2hpbGUgKChuZXh0ID0gdGhpcy5fbmV4dE5vZGUobmV4dCkpICYmIChuZXh0LnRhZ05hbWUgPT0gXCJCUlwiKSkge1xuICAgICAgICByZXBsYWNlZCA9IHRydWU7XG4gICAgICAgIHZhciBiclNpYmxpbmcgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICBuZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmV4dCk7XG4gICAgICAgIG5leHQgPSBiclNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIHJlbW92ZWQgYSA8YnI+IGNoYWluLCByZXBsYWNlIHRoZSByZW1haW5pbmcgPGJyPiB3aXRoIGEgPHA+LiBBZGRcbiAgICAgIC8vIGFsbCBzaWJsaW5nIG5vZGVzIGFzIGNoaWxkcmVuIG9mIHRoZSA8cD4gdW50aWwgd2UgaGl0IGFub3RoZXIgPGJyPlxuICAgICAgLy8gY2hhaW4uXG4gICAgICBpZiAocmVwbGFjZWQpIHtcbiAgICAgICAgdmFyIHAgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGJyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHAsIGJyKTtcblxuICAgICAgICBuZXh0ID0gcC5uZXh0U2libGluZztcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAvLyBJZiB3ZSd2ZSBoaXQgYW5vdGhlciA8YnI+PGJyPiwgd2UncmUgZG9uZSBhZGRpbmcgY2hpbGRyZW4gdG8gdGhpcyA8cD4uXG4gICAgICAgICAgaWYgKG5leHQudGFnTmFtZSA9PSBcIkJSXCIpIHtcbiAgICAgICAgICAgIHZhciBuZXh0RWxlbSA9IHRoaXMuX25leHROb2RlKG5leHQubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgaWYgKG5leHRFbGVtICYmIG5leHRFbGVtLnRhZ05hbWUgPT0gXCJCUlwiKVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX2lzUGhyYXNpbmdDb250ZW50KG5leHQpKVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBPdGhlcndpc2UsIG1ha2UgdGhpcyBub2RlIGEgY2hpbGQgb2YgdGhlIG5ldyA8cD4uXG4gICAgICAgICAgdmFyIHNpYmxpbmcgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICAgIHAuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgICAgICAgbmV4dCA9IHNpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAocC5sYXN0Q2hpbGQgJiYgdGhpcy5faXNXaGl0ZXNwYWNlKHAubGFzdENoaWxkKSkge1xuICAgICAgICAgIHAucmVtb3ZlQ2hpbGQocC5sYXN0Q2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAucGFyZW50Tm9kZS50YWdOYW1lID09PSBcIlBcIilcbiAgICAgICAgICB0aGlzLl9zZXROb2RlVGFnKHAucGFyZW50Tm9kZSwgXCJESVZcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgX3NldE5vZGVUYWc6IGZ1bmN0aW9uIChub2RlLCB0YWcpIHtcbiAgICB0aGlzLmxvZyhcIl9zZXROb2RlVGFnXCIsIG5vZGUsIHRhZyk7XG4gICAgaWYgKHRoaXMuX2RvY0pTRE9NUGFyc2VyKSB7XG4gICAgICBub2RlLmxvY2FsTmFtZSA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgbm9kZS50YWdOYW1lID0gdGFnLnRvVXBwZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHJlcGxhY2VtZW50LmFwcGVuZENoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocmVwbGFjZW1lbnQsIG5vZGUpO1xuICAgIGlmIChub2RlLnJlYWRhYmlsaXR5KVxuICAgICAgcmVwbGFjZW1lbnQucmVhZGFiaWxpdHkgPSBub2RlLnJlYWRhYmlsaXR5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcGxhY2VtZW50LnNldEF0dHJpYnV0ZShub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZSwgbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIC8qIGl0J3MgcG9zc2libGUgZm9yIHNldEF0dHJpYnV0ZSgpIHRvIHRocm93IGlmIHRoZSBhdHRyaWJ1dGUgbmFtZVxuICAgICAgICAgKiBpc24ndCBhIHZhbGlkIFhNTCBOYW1lLiBTdWNoIGF0dHJpYnV0ZXMgY2FuIGhvd2V2ZXIgYmUgcGFyc2VkIGZyb21cbiAgICAgICAgICogc291cmNlIGluIEhUTUwgZG9jcywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvaHRtbC9pc3N1ZXMvNDI3NSxcbiAgICAgICAgICogc28gd2UgY2FuIGhpdCB0aGVtIGhlcmUgYW5kIHRoZW4gdGhyb3cuIFdlIGRvbid0IGNhcmUgYWJvdXQgc3VjaFxuICAgICAgICAgKiBhdHRyaWJ1dGVzIHNvIHdlIGlnbm9yZSB0aGVtLlxuICAgICAgICAgKi9cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBhcnRpY2xlIG5vZGUgZm9yIGRpc3BsYXkuIENsZWFuIG91dCBhbnkgaW5saW5lIHN0eWxlcyxcbiAgICogaWZyYW1lcywgZm9ybXMsIHN0cmlwIGV4dHJhbmVvdXMgPHA+IHRhZ3MsIGV0Yy5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX3ByZXBBcnRpY2xlOiBmdW5jdGlvbihhcnRpY2xlQ29udGVudCkge1xuICAgIHRoaXMuX2NsZWFuU3R5bGVzKGFydGljbGVDb250ZW50KTtcblxuICAgIC8vIENoZWNrIGZvciBkYXRhIHRhYmxlcyBiZWZvcmUgd2UgY29udGludWUsIHRvIGF2b2lkIHJlbW92aW5nIGl0ZW1zIGluXG4gICAgLy8gdGhvc2UgdGFibGVzLCB3aGljaCB3aWxsIG9mdGVuIGJlIGlzb2xhdGVkIGV2ZW4gdGhvdWdoIHRoZXkncmVcbiAgICAvLyB2aXN1YWxseSBsaW5rZWQgdG8gb3RoZXIgY29udGVudC1mdWwgZWxlbWVudHMgKHRleHQsIGltYWdlcywgZXRjLikuXG4gICAgdGhpcy5fbWFya0RhdGFUYWJsZXMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy5fZml4TGF6eUltYWdlcyhhcnRpY2xlQ29udGVudCk7XG5cbiAgICAvLyBDbGVhbiBvdXQganVuayBmcm9tIHRoZSBhcnRpY2xlIGNvbnRlbnRcbiAgICB0aGlzLl9jbGVhbkNvbmRpdGlvbmFsbHkoYXJ0aWNsZUNvbnRlbnQsIFwiZm9ybVwiKTtcbiAgICB0aGlzLl9jbGVhbkNvbmRpdGlvbmFsbHkoYXJ0aWNsZUNvbnRlbnQsIFwiZmllbGRzZXRcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwib2JqZWN0XCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImVtYmVkXCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImZvb3RlclwiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJsaW5rXCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImFzaWRlXCIpO1xuXG4gICAgLy8gQ2xlYW4gb3V0IGVsZW1lbnRzIHdpdGggbGl0dGxlIGNvbnRlbnQgdGhhdCBoYXZlIFwic2hhcmVcIiBpbiB0aGVpciBpZC9jbGFzcyBjb21iaW5hdGlvbnMgZnJvbSBmaW5hbCB0b3AgY2FuZGlkYXRlcyxcbiAgICAvLyB3aGljaCBtZWFucyB3ZSBkb24ndCByZW1vdmUgdGhlIHRvcCBjYW5kaWRhdGVzIGV2ZW4gdGhleSBoYXZlIFwic2hhcmVcIi5cblxuICAgIHZhciBzaGFyZUVsZW1lbnRUaHJlc2hvbGQgPSB0aGlzLkRFRkFVTFRfQ0hBUl9USFJFU0hPTEQ7XG5cbiAgICB0aGlzLl9mb3JFYWNoTm9kZShhcnRpY2xlQ29udGVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKHRvcENhbmRpZGF0ZSkge1xuICAgICAgdGhpcy5fY2xlYW5NYXRjaGVkTm9kZXModG9wQ2FuZGlkYXRlLCBmdW5jdGlvbiAobm9kZSwgbWF0Y2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuUkVHRVhQUy5zaGFyZUVsZW1lbnRzLnRlc3QobWF0Y2hTdHJpbmcpICYmIG5vZGUudGV4dENvbnRlbnQubGVuZ3RoIDwgc2hhcmVFbGVtZW50VGhyZXNob2xkO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJpZnJhbWVcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiaW5wdXRcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwidGV4dGFyZWFcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwic2VsZWN0XCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImJ1dHRvblwiKTtcbiAgICB0aGlzLl9jbGVhbkhlYWRlcnMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgLy8gRG8gdGhlc2UgbGFzdCBhcyB0aGUgcHJldmlvdXMgc3R1ZmYgbWF5IGhhdmUgcmVtb3ZlZCBqdW5rXG4gICAgLy8gdGhhdCB3aWxsIGFmZmVjdCB0aGVzZVxuICAgIHRoaXMuX2NsZWFuQ29uZGl0aW9uYWxseShhcnRpY2xlQ29udGVudCwgXCJ0YWJsZVwiKTtcbiAgICB0aGlzLl9jbGVhbkNvbmRpdGlvbmFsbHkoYXJ0aWNsZUNvbnRlbnQsIFwidWxcIik7XG4gICAgdGhpcy5fY2xlYW5Db25kaXRpb25hbGx5KGFydGljbGVDb250ZW50LCBcImRpdlwiKTtcblxuICAgIC8vIHJlcGxhY2UgSDEgd2l0aCBIMiBhcyBIMSBzaG91bGQgYmUgb25seSB0aXRsZSB0aGF0IGlzIGRpc3BsYXllZCBzZXBhcmF0ZWx5XG4gICAgdGhpcy5fcmVwbGFjZU5vZGVUYWdzKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhhcnRpY2xlQ29udGVudCwgW1wiaDFcIl0pLCBcImgyXCIpO1xuXG4gICAgLy8gUmVtb3ZlIGV4dHJhIHBhcmFncmFwaHNcbiAgICB0aGlzLl9yZW1vdmVOb2Rlcyh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcInBcIl0pLCBmdW5jdGlvbiAocGFyYWdyYXBoKSB7XG4gICAgICB2YXIgaW1nQ291bnQgPSBwYXJhZ3JhcGguZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIikubGVuZ3RoO1xuICAgICAgdmFyIGVtYmVkQ291bnQgPSBwYXJhZ3JhcGguZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJlbWJlZFwiKS5sZW5ndGg7XG4gICAgICB2YXIgb2JqZWN0Q291bnQgPSBwYXJhZ3JhcGguZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJvYmplY3RcIikubGVuZ3RoO1xuICAgICAgLy8gQXQgdGhpcyBwb2ludCwgbmFzdHkgaWZyYW1lcyBoYXZlIGJlZW4gcmVtb3ZlZCwgb25seSByZW1haW4gZW1iZWRkZWQgdmlkZW8gb25lcy5cbiAgICAgIHZhciBpZnJhbWVDb3VudCA9IHBhcmFncmFwaC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlmcmFtZVwiKS5sZW5ndGg7XG4gICAgICB2YXIgdG90YWxDb3VudCA9IGltZ0NvdW50ICsgZW1iZWRDb3VudCArIG9iamVjdENvdW50ICsgaWZyYW1lQ291bnQ7XG5cbiAgICAgIHJldHVybiB0b3RhbENvdW50ID09PSAwICYmICF0aGlzLl9nZXRJbm5lclRleHQocGFyYWdyYXBoLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9mb3JFYWNoTm9kZSh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcImJyXCJdKSwgZnVuY3Rpb24oYnIpIHtcbiAgICAgIHZhciBuZXh0ID0gdGhpcy5fbmV4dE5vZGUoYnIubmV4dFNpYmxpbmcpO1xuICAgICAgaWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09IFwiUFwiKVxuICAgICAgICBici5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJyKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBzaW5nbGUtY2VsbCB0YWJsZXNcbiAgICB0aGlzLl9mb3JFYWNoTm9kZSh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcInRhYmxlXCJdKSwgZnVuY3Rpb24odGFibGUpIHtcbiAgICAgIHZhciB0Ym9keSA9IHRoaXMuX2hhc1NpbmdsZVRhZ0luc2lkZUVsZW1lbnQodGFibGUsIFwiVEJPRFlcIikgPyB0YWJsZS5maXJzdEVsZW1lbnRDaGlsZCA6IHRhYmxlO1xuICAgICAgaWYgKHRoaXMuX2hhc1NpbmdsZVRhZ0luc2lkZUVsZW1lbnQodGJvZHksIFwiVFJcIikpIHtcbiAgICAgICAgdmFyIHJvdyA9IHRib2R5LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAodGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChyb3csIFwiVERcIikpIHtcbiAgICAgICAgICB2YXIgY2VsbCA9IHJvdy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBjZWxsID0gdGhpcy5fc2V0Tm9kZVRhZyhjZWxsLCB0aGlzLl9ldmVyeU5vZGUoY2VsbC5jaGlsZE5vZGVzLCB0aGlzLl9pc1BocmFzaW5nQ29udGVudCkgPyBcIlBcIiA6IFwiRElWXCIpO1xuICAgICAgICAgIHRhYmxlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNlbGwsIHRhYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGEgbm9kZSB3aXRoIHRoZSByZWFkYWJpbGl0eSBvYmplY3QuIEFsc28gY2hlY2tzIHRoZVxuICAgKiBjbGFzc05hbWUvaWQgZm9yIHNwZWNpYWwgbmFtZXMgdG8gYWRkIHRvIGl0cyBzY29yZS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICoqL1xuICBfaW5pdGlhbGl6ZU5vZGU6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLnJlYWRhYmlsaXR5ID0ge1wiY29udGVudFNjb3JlXCI6IDB9O1xuXG4gICAgc3dpdGNoIChub2RlLnRhZ05hbWUpIHtcbiAgICAgIGNhc2UgXCJESVZcIjpcbiAgICAgICAgbm9kZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKz0gNTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJQUkVcIjpcbiAgICAgIGNhc2UgXCJURFwiOlxuICAgICAgY2FzZSBcIkJMT0NLUVVPVEVcIjpcbiAgICAgICAgbm9kZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKz0gMztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJBRERSRVNTXCI6XG4gICAgICBjYXNlIFwiT0xcIjpcbiAgICAgIGNhc2UgXCJVTFwiOlxuICAgICAgY2FzZSBcIkRMXCI6XG4gICAgICBjYXNlIFwiRERcIjpcbiAgICAgIGNhc2UgXCJEVFwiOlxuICAgICAgY2FzZSBcIkxJXCI6XG4gICAgICBjYXNlIFwiRk9STVwiOlxuICAgICAgICBub2RlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSAtPSAzO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIkgxXCI6XG4gICAgICBjYXNlIFwiSDJcIjpcbiAgICAgIGNhc2UgXCJIM1wiOlxuICAgICAgY2FzZSBcIkg0XCI6XG4gICAgICBjYXNlIFwiSDVcIjpcbiAgICAgIGNhc2UgXCJINlwiOlxuICAgICAgY2FzZSBcIlRIXCI6XG4gICAgICAgIG5vZGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlIC09IDU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIG5vZGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICs9IHRoaXMuX2dldENsYXNzV2VpZ2h0KG5vZGUpO1xuICB9LFxuXG4gIF9yZW1vdmVBbmRHZXROZXh0OiBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIG5leHROb2RlID0gdGhpcy5fZ2V0TmV4dE5vZGUobm9kZSwgdHJ1ZSk7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgfSxcblxuICAvKipcbiAgICogVHJhdmVyc2UgdGhlIERPTSBmcm9tIG5vZGUgdG8gbm9kZSwgc3RhcnRpbmcgYXQgdGhlIG5vZGUgcGFzc2VkIGluLlxuICAgKiBQYXNzIHRydWUgZm9yIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGluZGljYXRlIHRoaXMgbm9kZSBpdHNlbGZcbiAgICogKGFuZCBpdHMga2lkcykgYXJlIGdvaW5nIGF3YXksIGFuZCB3ZSB3YW50IHRoZSBuZXh0IG5vZGUgb3Zlci5cbiAgICpcbiAgICogQ2FsbGluZyB0aGlzIGluIGEgbG9vcCB3aWxsIHRyYXZlcnNlIHRoZSBET00gZGVwdGgtZmlyc3QuXG4gICAqL1xuICBfZ2V0TmV4dE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGlnbm9yZVNlbGZBbmRLaWRzKSB7XG4gICAgLy8gRmlyc3QgY2hlY2sgZm9yIGtpZHMgaWYgdGhvc2UgYXJlbid0IGJlaW5nIGlnbm9yZWRcbiAgICBpZiAoIWlnbm9yZVNlbGZBbmRLaWRzICYmIG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgIHJldHVybiBub2RlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgICAvLyBUaGVuIGZvciBzaWJsaW5ncy4uLlxuICAgIGlmIChub2RlLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgcmV0dXJuIG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgICAvLyBBbmQgZmluYWxseSwgbW92ZSB1cCB0aGUgcGFyZW50IGNoYWluICphbmQqIGZpbmQgYSBzaWJsaW5nXG4gICAgLy8gKGJlY2F1c2UgdGhpcyBpcyBkZXB0aC1maXJzdCB0cmF2ZXJzYWwsIHdlIHdpbGwgaGF2ZSBhbHJlYWR5XG4gICAgLy8gc2VlbiB0aGUgcGFyZW50IG5vZGVzIHRoZW1zZWx2ZXMpLlxuICAgIGRvIHtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAobm9kZSAmJiAhbm9kZS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIHJldHVybiBub2RlICYmIG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICB9LFxuXG4gIC8vIGNvbXBhcmVzIHNlY29uZCB0ZXh0IHRvIGZpcnN0IG9uZVxuICAvLyAxID0gc2FtZSB0ZXh0LCAwID0gY29tcGxldGVseSBkaWZmZXJlbnQgdGV4dFxuICAvLyB3b3JrcyB0aGUgd2F5IHRoYXQgaXQgc3BsaXRzIGJvdGggdGV4dHMgaW50byB3b3JkcyBhbmQgdGhlbiBmaW5kcyB3b3JkcyB0aGF0IGFyZSB1bmlxdWUgaW4gc2Vjb25kIHRleHRcbiAgLy8gdGhlIHJlc3VsdCBpcyBnaXZlbiBieSB0aGUgbG93ZXIgbGVuZ3RoIG9mIHVuaXF1ZSBwYXJ0c1xuICBfdGV4dFNpbWlsYXJpdHk6IGZ1bmN0aW9uKHRleHRBLCB0ZXh0Qikge1xuICAgIHZhciB0b2tlbnNBID0gdGV4dEEudG9Mb3dlckNhc2UoKS5zcGxpdCh0aGlzLlJFR0VYUFMudG9rZW5pemUpLmZpbHRlcihCb29sZWFuKTtcbiAgICB2YXIgdG9rZW5zQiA9IHRleHRCLnRvTG93ZXJDYXNlKCkuc3BsaXQodGhpcy5SRUdFWFBTLnRva2VuaXplKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKCF0b2tlbnNBLmxlbmd0aCB8fCAhdG9rZW5zQi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgdW5pcVRva2Vuc0IgPSB0b2tlbnNCLmZpbHRlcih0b2tlbiA9PiAhdG9rZW5zQS5pbmNsdWRlcyh0b2tlbikpO1xuICAgIHZhciBkaXN0YW5jZUIgPSB1bmlxVG9rZW5zQi5qb2luKFwiIFwiKS5sZW5ndGggLyB0b2tlbnNCLmpvaW4oXCIgXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gMSAtIGRpc3RhbmNlQjtcbiAgfSxcblxuICBfY2hlY2tCeWxpbmU6IGZ1bmN0aW9uKG5vZGUsIG1hdGNoU3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2FydGljbGVCeWxpbmUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHJlbCA9IG5vZGUuZ2V0QXR0cmlidXRlKFwicmVsXCIpO1xuICAgICAgdmFyIGl0ZW1wcm9wID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJpdGVtcHJvcFwiKTtcbiAgICB9XG5cbiAgICBpZiAoKHJlbCA9PT0gXCJhdXRob3JcIiB8fCAoaXRlbXByb3AgJiYgaXRlbXByb3AuaW5kZXhPZihcImF1dGhvclwiKSAhPT0gLTEpIHx8IHRoaXMuUkVHRVhQUy5ieWxpbmUudGVzdChtYXRjaFN0cmluZykpICYmIHRoaXMuX2lzVmFsaWRCeWxpbmUobm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgIHRoaXMuX2FydGljbGVCeWxpbmUgPSBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBfZ2V0Tm9kZUFuY2VzdG9yczogZnVuY3Rpb24obm9kZSwgbWF4RGVwdGgpIHtcbiAgICBtYXhEZXB0aCA9IG1heERlcHRoIHx8IDA7XG4gICAgdmFyIGkgPSAwLCBhbmNlc3RvcnMgPSBbXTtcbiAgICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBhbmNlc3RvcnMucHVzaChub2RlLnBhcmVudE5vZGUpO1xuICAgICAgaWYgKG1heERlcHRoICYmICsraSA9PT0gbWF4RGVwdGgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9ycztcbiAgfSxcblxuICAvKioqXG4gICAqIGdyYWJBcnRpY2xlIC0gVXNpbmcgYSB2YXJpZXR5IG9mIG1ldHJpY3MgKGNvbnRlbnQgc2NvcmUsIGNsYXNzbmFtZSwgZWxlbWVudCB0eXBlcyksIGZpbmQgdGhlIGNvbnRlbnQgdGhhdCBpc1xuICAgKiAgICAgICAgIG1vc3QgbGlrZWx5IHRvIGJlIHRoZSBzdHVmZiBhIHVzZXIgd2FudHMgdG8gcmVhZC4gVGhlbiByZXR1cm4gaXQgd3JhcHBlZCB1cCBpbiBhIGRpdi5cbiAgICpcbiAgICogQHBhcmFtIHBhZ2UgYSBkb2N1bWVudCB0byBydW4gdXBvbi4gTmVlZHMgdG8gYmUgYSBmdWxsIGRvY3VtZW50LCBjb21wbGV0ZSB3aXRoIGJvZHkuXG4gICAqIEByZXR1cm4gRWxlbWVudFxuICAqKi9cbiAgX2dyYWJBcnRpY2xlOiBmdW5jdGlvbiAocGFnZSkge1xuICAgIHRoaXMubG9nKFwiKioqKiBncmFiQXJ0aWNsZSAqKioqXCIpO1xuICAgIHZhciBkb2MgPSB0aGlzLl9kb2M7XG4gICAgdmFyIGlzUGFnaW5nID0gcGFnZSAhPT0gbnVsbDtcbiAgICBwYWdlID0gcGFnZSA/IHBhZ2UgOiB0aGlzLl9kb2MuYm9keTtcblxuICAgIC8vIFdlIGNhbid0IGdyYWIgYW4gYXJ0aWNsZSBpZiB3ZSBkb24ndCBoYXZlIGEgcGFnZSFcbiAgICBpZiAoIXBhZ2UpIHtcbiAgICAgIHRoaXMubG9nKFwiTm8gYm9keSBmb3VuZCBpbiBkb2N1bWVudC4gQWJvcnQuXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHBhZ2VDYWNoZUh0bWwgPSBwYWdlLmlubmVySFRNTDtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB0aGlzLmxvZyhcIlN0YXJ0aW5nIGdyYWJBcnRpY2xlIGxvb3BcIik7XG4gICAgICB2YXIgc3RyaXBVbmxpa2VseUNhbmRpZGF0ZXMgPSB0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX1NUUklQX1VOTElLRUxZUyk7XG5cbiAgICAgIC8vIEZpcnN0LCBub2RlIHByZXBwaW5nLiBUcmFzaCBub2RlcyB0aGF0IGxvb2sgY3J1ZGR5IChsaWtlIG9uZXMgd2l0aCB0aGVcbiAgICAgIC8vIGNsYXNzIG5hbWUgXCJjb21tZW50XCIsIGV0YyksIGFuZCB0dXJuIGRpdnMgaW50byBQIHRhZ3Mgd2hlcmUgdGhleSBoYXZlIGJlZW5cbiAgICAgIC8vIHVzZWQgaW5hcHByb3ByaWF0ZWx5IChhcyBpbiwgd2hlcmUgdGhleSBjb250YWluIG5vIG90aGVyIGJsb2NrIGxldmVsIGVsZW1lbnRzLilcbiAgICAgIHZhciBlbGVtZW50c1RvU2NvcmUgPSBbXTtcbiAgICAgIHZhciBub2RlID0gdGhpcy5fZG9jLmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgbGV0IHNob3VsZFJlbW92ZVRpdGxlSGVhZGVyID0gdHJ1ZTtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcblxuICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSBcIkhUTUxcIikge1xuICAgICAgICAgIHRoaXMuX2FydGljbGVMYW5nID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyaW5nID0gbm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5vZGUuaWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1Byb2JhYmx5VmlzaWJsZShub2RlKSkge1xuICAgICAgICAgIHRoaXMubG9nKFwiUmVtb3ZpbmcgaGlkZGVuIG5vZGUgLSBcIiArIG1hdGNoU3RyaW5nKTtcbiAgICAgICAgICBub2RlID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChub2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVzZXIgaXMgbm90IGFibGUgdG8gc2VlIGVsZW1lbnRzIGFwcGxpZWQgd2l0aCBib3RoIFwiYXJpYS1tb2RhbCA9IHRydWVcIiBhbmQgXCJyb2xlID0gZGlhbG9nXCJcbiAgICAgICAgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKFwiYXJpYS1tb2RhbFwiKSA9PSBcInRydWVcIiAmJiBub2RlLmdldEF0dHJpYnV0ZShcInJvbGVcIikgPT0gXCJkaWFsb2dcIikge1xuICAgICAgICAgIG5vZGUgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoaXMgbm9kZSBpcyBhIGJ5bGluZSwgYW5kIHJlbW92ZSBpdCBpZiBpdCBpcy5cbiAgICAgICAgaWYgKHRoaXMuX2NoZWNrQnlsaW5lKG5vZGUsIG1hdGNoU3RyaW5nKSkge1xuICAgICAgICAgIG5vZGUgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFJlbW92ZVRpdGxlSGVhZGVyICYmIHRoaXMuX2hlYWRlckR1cGxpY2F0ZXNUaXRsZShub2RlKSkge1xuICAgICAgICAgIHRoaXMubG9nKFwiUmVtb3ZpbmcgaGVhZGVyOiBcIiwgbm9kZS50ZXh0Q29udGVudC50cmltKCksIHRoaXMuX2FydGljbGVUaXRsZS50cmltKCkpO1xuICAgICAgICAgIHNob3VsZFJlbW92ZVRpdGxlSGVhZGVyID0gZmFsc2U7XG4gICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgdW5saWtlbHkgY2FuZGlkYXRlc1xuICAgICAgICBpZiAoc3RyaXBVbmxpa2VseUNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICBpZiAodGhpcy5SRUdFWFBTLnVubGlrZWx5Q2FuZGlkYXRlcy50ZXN0KG1hdGNoU3RyaW5nKSAmJlxuICAgICAgICAgICAgICAhdGhpcy5SRUdFWFBTLm9rTWF5YmVJdHNBQ2FuZGlkYXRlLnRlc3QobWF0Y2hTdHJpbmcpICYmXG4gICAgICAgICAgICAgICF0aGlzLl9oYXNBbmNlc3RvclRhZyhub2RlLCBcInRhYmxlXCIpICYmXG4gICAgICAgICAgICAgICF0aGlzLl9oYXNBbmNlc3RvclRhZyhub2RlLCBcImNvZGVcIikgJiZcbiAgICAgICAgICAgICAgbm9kZS50YWdOYW1lICE9PSBcIkJPRFlcIiAmJlxuICAgICAgICAgICAgICBub2RlLnRhZ05hbWUgIT09IFwiQVwiKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIlJlbW92aW5nIHVubGlrZWx5IGNhbmRpZGF0ZSAtIFwiICsgbWF0Y2hTdHJpbmcpO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5VTkxJS0VMWV9ST0xFUy5pbmNsdWRlcyhub2RlLmdldEF0dHJpYnV0ZShcInJvbGVcIikpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIlJlbW92aW5nIGNvbnRlbnQgd2l0aCByb2xlIFwiICsgbm9kZS5nZXRBdHRyaWJ1dGUoXCJyb2xlXCIpICsgXCIgLSBcIiArIG1hdGNoU3RyaW5nKTtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5vZGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIERJViwgU0VDVElPTiwgYW5kIEhFQURFUiBub2RlcyB3aXRob3V0IGFueSBjb250ZW50KGUuZy4gdGV4dCwgaW1hZ2UsIHZpZGVvLCBvciBpZnJhbWUpLlxuICAgICAgICBpZiAoKG5vZGUudGFnTmFtZSA9PT0gXCJESVZcIiB8fCBub2RlLnRhZ05hbWUgPT09IFwiU0VDVElPTlwiIHx8IG5vZGUudGFnTmFtZSA9PT0gXCJIRUFERVJcIiB8fFxuICAgICAgICAgICAgIG5vZGUudGFnTmFtZSA9PT0gXCJIMVwiIHx8IG5vZGUudGFnTmFtZSA9PT0gXCJIMlwiIHx8IG5vZGUudGFnTmFtZSA9PT0gXCJIM1wiIHx8XG4gICAgICAgICAgICAgbm9kZS50YWdOYW1lID09PSBcIkg0XCIgfHwgbm9kZS50YWdOYW1lID09PSBcIkg1XCIgfHwgbm9kZS50YWdOYW1lID09PSBcIkg2XCIpICYmXG4gICAgICAgICAgICB0aGlzLl9pc0VsZW1lbnRXaXRob3V0Q29udGVudChub2RlKSkge1xuICAgICAgICAgIG5vZGUgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuREVGQVVMVF9UQUdTX1RPX1NDT1JFLmluZGV4T2Yobm9kZS50YWdOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICBlbGVtZW50c1RvU2NvcmUucHVzaChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFR1cm4gYWxsIGRpdnMgdGhhdCBkb24ndCBoYXZlIGNoaWxkcmVuIGJsb2NrIGxldmVsIGVsZW1lbnRzIGludG8gcCdzXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IFwiRElWXCIpIHtcbiAgICAgICAgICAvLyBQdXQgcGhyYXNpbmcgY29udGVudCBpbnRvIHBhcmFncmFwaHMuXG4gICAgICAgICAgdmFyIHAgPSBudWxsO1xuICAgICAgICAgIHZhciBjaGlsZE5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgd2hpbGUgKGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY2hpbGROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzUGhyYXNpbmdDb250ZW50KGNoaWxkTm9kZSkpIHtcbiAgICAgICAgICAgICAgaWYgKHAgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwLmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzV2hpdGVzcGFjZShjaGlsZE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcCA9IGRvYy5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICBub2RlLnJlcGxhY2VDaGlsZChwLCBjaGlsZE5vZGUpO1xuICAgICAgICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHdoaWxlIChwLmxhc3RDaGlsZCAmJiB0aGlzLl9pc1doaXRlc3BhY2UocC5sYXN0Q2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgcC5yZW1vdmVDaGlsZChwLmxhc3RDaGlsZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZE5vZGUgPSBuZXh0U2libGluZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTaXRlcyBsaWtlIGh0dHA6Ly9tb2JpbGUuc2xhdGUuY29tIGVuY2xvc2VzIGVhY2ggcGFyYWdyYXBoIHdpdGggYSBESVZcbiAgICAgICAgICAvLyBlbGVtZW50LiBESVZzIHdpdGggb25seSBhIFAgZWxlbWVudCBpbnNpZGUgYW5kIG5vIHRleHQgY29udGVudCBjYW4gYmVcbiAgICAgICAgICAvLyBzYWZlbHkgY29udmVydGVkIGludG8gcGxhaW4gUCBlbGVtZW50cyB0byBhdm9pZCBjb25mdXNpbmcgdGhlIHNjb3JpbmdcbiAgICAgICAgICAvLyBhbGdvcml0aG0gd2l0aCBESVZzIHdpdGggYXJlLCBpbiBwcmFjdGljZSwgcGFyYWdyYXBocy5cbiAgICAgICAgICBpZiAodGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChub2RlLCBcIlBcIikgJiYgdGhpcy5fZ2V0TGlua0RlbnNpdHkobm9kZSkgPCAwLjI1KSB7XG4gICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIG5vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IG5ld05vZGU7XG4gICAgICAgICAgICBlbGVtZW50c1RvU2NvcmUucHVzaChub2RlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9oYXNDaGlsZEJsb2NrRWxlbWVudChub2RlKSkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX3NldE5vZGVUYWcobm9kZSwgXCJQXCIpO1xuICAgICAgICAgICAgZWxlbWVudHNUb1Njb3JlLnB1c2gobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSB0aGlzLl9nZXROZXh0Tm9kZShub2RlKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBMb29wIHRocm91Z2ggYWxsIHBhcmFncmFwaHMsIGFuZCBhc3NpZ24gYSBzY29yZSB0byB0aGVtIGJhc2VkIG9uIGhvdyBjb250ZW50LXkgdGhleSBsb29rLlxuICAgICAgICogVGhlbiBhZGQgdGhlaXIgc2NvcmUgdG8gdGhlaXIgcGFyZW50IG5vZGUuXG4gICAgICAgKlxuICAgICAgICogQSBzY29yZSBpcyBkZXRlcm1pbmVkIGJ5IHRoaW5ncyBsaWtlIG51bWJlciBvZiBjb21tYXMsIGNsYXNzIG5hbWVzLCBldGMuIE1heWJlIGV2ZW50dWFsbHkgbGluayBkZW5zaXR5LlxuICAgICAgKiovXG4gICAgICB2YXIgY2FuZGlkYXRlcyA9IFtdO1xuICAgICAgdGhpcy5fZm9yRWFjaE5vZGUoZWxlbWVudHNUb1Njb3JlLCBmdW5jdGlvbihlbGVtZW50VG9TY29yZSkge1xuICAgICAgICBpZiAoIWVsZW1lbnRUb1Njb3JlLnBhcmVudE5vZGUgfHwgdHlwZW9mKGVsZW1lbnRUb1Njb3JlLnBhcmVudE5vZGUudGFnTmFtZSkgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8vIElmIHRoaXMgcGFyYWdyYXBoIGlzIGxlc3MgdGhhbiAyNSBjaGFyYWN0ZXJzLCBkb24ndCBldmVuIGNvdW50IGl0LlxuICAgICAgICB2YXIgaW5uZXJUZXh0ID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGVsZW1lbnRUb1Njb3JlKTtcbiAgICAgICAgaWYgKGlubmVyVGV4dC5sZW5ndGggPCAyNSlcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8gRXhjbHVkZSBub2RlcyB3aXRoIG5vIGFuY2VzdG9yLlxuICAgICAgICB2YXIgYW5jZXN0b3JzID0gdGhpcy5fZ2V0Tm9kZUFuY2VzdG9ycyhlbGVtZW50VG9TY29yZSwgNSk7XG4gICAgICAgIGlmIChhbmNlc3RvcnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgY29udGVudFNjb3JlID0gMDtcblxuICAgICAgICAvLyBBZGQgYSBwb2ludCBmb3IgdGhlIHBhcmFncmFwaCBpdHNlbGYgYXMgYSBiYXNlLlxuICAgICAgICBjb250ZW50U2NvcmUgKz0gMTtcblxuICAgICAgICAvLyBBZGQgcG9pbnRzIGZvciBhbnkgY29tbWFzIHdpdGhpbiB0aGlzIHBhcmFncmFwaC5cbiAgICAgICAgY29udGVudFNjb3JlICs9IGlubmVyVGV4dC5zcGxpdCh0aGlzLlJFR0VYUFMuY29tbWFzKS5sZW5ndGg7XG5cbiAgICAgICAgLy8gRm9yIGV2ZXJ5IDEwMCBjaGFyYWN0ZXJzIGluIHRoaXMgcGFyYWdyYXBoLCBhZGQgYW5vdGhlciBwb2ludC4gVXAgdG8gMyBwb2ludHMuXG4gICAgICAgIGNvbnRlbnRTY29yZSArPSBNYXRoLm1pbihNYXRoLmZsb29yKGlubmVyVGV4dC5sZW5ndGggLyAxMDApLCAzKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFuZCBzY29yZSBhbmNlc3RvcnMuXG4gICAgICAgIHRoaXMuX2ZvckVhY2hOb2RlKGFuY2VzdG9ycywgZnVuY3Rpb24oYW5jZXN0b3IsIGxldmVsKSB7XG4gICAgICAgICAgaWYgKCFhbmNlc3Rvci50YWdOYW1lIHx8ICFhbmNlc3Rvci5wYXJlbnROb2RlIHx8IHR5cGVvZihhbmNlc3Rvci5wYXJlbnROb2RlLnRhZ05hbWUpID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZihhbmNlc3Rvci5yZWFkYWJpbGl0eSkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVOb2RlKGFuY2VzdG9yKTtcbiAgICAgICAgICAgIGNhbmRpZGF0ZXMucHVzaChhbmNlc3Rvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm9kZSBzY29yZSBkaXZpZGVyOlxuICAgICAgICAgIC8vIC0gcGFyZW50OiAgICAgICAgICAgICAxIChubyBkaXZpc2lvbilcbiAgICAgICAgICAvLyAtIGdyYW5kcGFyZW50OiAgICAgICAgMlxuICAgICAgICAgIC8vIC0gZ3JlYXQgZ3JhbmRwYXJlbnQrOiBhbmNlc3RvciBsZXZlbCAqIDNcbiAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICB2YXIgc2NvcmVEaXZpZGVyID0gMTtcbiAgICAgICAgICBlbHNlIGlmIChsZXZlbCA9PT0gMSlcbiAgICAgICAgICAgIHNjb3JlRGl2aWRlciA9IDI7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2NvcmVEaXZpZGVyID0gbGV2ZWwgKiAzO1xuICAgICAgICAgIGFuY2VzdG9yLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSArPSBjb250ZW50U2NvcmUgLyBzY29yZURpdmlkZXI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEFmdGVyIHdlJ3ZlIGNhbGN1bGF0ZWQgc2NvcmVzLCBsb29wIHRocm91Z2ggYWxsIG9mIHRoZSBwb3NzaWJsZVxuICAgICAgLy8gY2FuZGlkYXRlIG5vZGVzIHdlIGZvdW5kIGFuZCBmaW5kIHRoZSBvbmUgd2l0aCB0aGUgaGlnaGVzdCBzY29yZS5cbiAgICAgIHZhciB0b3BDYW5kaWRhdGVzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMCwgY2wgPSBjYW5kaWRhdGVzLmxlbmd0aDsgYyA8IGNsOyBjICs9IDEpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbY107XG5cbiAgICAgICAgLy8gU2NhbGUgdGhlIGZpbmFsIGNhbmRpZGF0ZXMgc2NvcmUgYmFzZWQgb24gbGluayBkZW5zaXR5LiBHb29kIGNvbnRlbnRcbiAgICAgICAgLy8gc2hvdWxkIGhhdmUgYSByZWxhdGl2ZWx5IHNtYWxsIGxpbmsgZGVuc2l0eSAoNSUgb3IgbGVzcykgYW5kIGJlIG1vc3RseVxuICAgICAgICAvLyB1bmFmZmVjdGVkIGJ5IHRoaXMgb3BlcmF0aW9uLlxuICAgICAgICB2YXIgY2FuZGlkYXRlU2NvcmUgPSBjYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICogKDEgLSB0aGlzLl9nZXRMaW5rRGVuc2l0eShjYW5kaWRhdGUpKTtcbiAgICAgICAgY2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSA9IGNhbmRpZGF0ZVNjb3JlO1xuXG4gICAgICAgIHRoaXMubG9nKFwiQ2FuZGlkYXRlOlwiLCBjYW5kaWRhdGUsIFwid2l0aCBzY29yZSBcIiArIGNhbmRpZGF0ZVNjb3JlKTtcblxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMuX25iVG9wQ2FuZGlkYXRlczsgdCsrKSB7XG4gICAgICAgICAgdmFyIGFUb3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGVzW3RdO1xuXG4gICAgICAgICAgaWYgKCFhVG9wQ2FuZGlkYXRlIHx8IGNhbmRpZGF0ZVNjb3JlID4gYVRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUpIHtcbiAgICAgICAgICAgIHRvcENhbmRpZGF0ZXMuc3BsaWNlKHQsIDAsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICBpZiAodG9wQ2FuZGlkYXRlcy5sZW5ndGggPiB0aGlzLl9uYlRvcENhbmRpZGF0ZXMpXG4gICAgICAgICAgICAgIHRvcENhbmRpZGF0ZXMucG9wKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZXNbMF0gfHwgbnVsbDtcbiAgICAgIHZhciBuZWVkZWRUb0NyZWF0ZVRvcENhbmRpZGF0ZSA9IGZhbHNlO1xuICAgICAgdmFyIHBhcmVudE9mVG9wQ2FuZGlkYXRlO1xuXG4gICAgICAvLyBJZiB3ZSBzdGlsbCBoYXZlIG5vIHRvcCBjYW5kaWRhdGUsIGp1c3QgdXNlIHRoZSBib2R5IGFzIGEgbGFzdCByZXNvcnQuXG4gICAgICAvLyBXZSBhbHNvIGhhdmUgdG8gY29weSB0aGUgYm9keSBub2RlIHNvIGl0IGlzIHNvbWV0aGluZyB3ZSBjYW4gbW9kaWZ5LlxuICAgICAgaWYgKHRvcENhbmRpZGF0ZSA9PT0gbnVsbCB8fCB0b3BDYW5kaWRhdGUudGFnTmFtZSA9PT0gXCJCT0RZXCIpIHtcbiAgICAgICAgLy8gTW92ZSBhbGwgb2YgdGhlIHBhZ2UncyBjaGlsZHJlbiBpbnRvIHRvcENhbmRpZGF0ZVxuICAgICAgICB0b3BDYW5kaWRhdGUgPSBkb2MuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgbmVlZGVkVG9DcmVhdGVUb3BDYW5kaWRhdGUgPSB0cnVlO1xuICAgICAgICAvLyBNb3ZlIGV2ZXJ5dGhpbmcgKG5vdCBqdXN0IGVsZW1lbnRzLCBhbHNvIHRleHQgbm9kZXMgZXRjLikgaW50byB0aGUgY29udGFpbmVyXG4gICAgICAgIC8vIHNvIHdlIGV2ZW4gaW5jbHVkZSB0ZXh0IGRpcmVjdGx5IGluIHRoZSBib2R5OlxuICAgICAgICB3aGlsZSAocGFnZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgdGhpcy5sb2coXCJNb3ZpbmcgY2hpbGQgb3V0OlwiLCBwYWdlLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIHRvcENhbmRpZGF0ZS5hcHBlbmRDaGlsZChwYWdlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZCh0b3BDYW5kaWRhdGUpO1xuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVOb2RlKHRvcENhbmRpZGF0ZSk7XG4gICAgICB9IGVsc2UgaWYgKHRvcENhbmRpZGF0ZSkge1xuICAgICAgICAvLyBGaW5kIGEgYmV0dGVyIHRvcCBjYW5kaWRhdGUgbm9kZSBpZiBpdCBjb250YWlucyAoYXQgbGVhc3QgdGhyZWUpIG5vZGVzIHdoaWNoIGJlbG9uZyB0byBgdG9wQ2FuZGlkYXRlc2AgYXJyYXlcbiAgICAgICAgLy8gYW5kIHdob3NlIHNjb3JlcyBhcmUgcXVpdGUgY2xvc2VkIHdpdGggY3VycmVudCBgdG9wQ2FuZGlkYXRlYCBub2RlLlxuICAgICAgICB2YXIgYWx0ZXJuYXRpdmVDYW5kaWRhdGVBbmNlc3RvcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB0b3BDYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvcENhbmRpZGF0ZXNbaV0ucmVhZGFiaWxpdHkuY29udGVudFNjb3JlIC8gdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSA+PSAwLjc1KSB7XG4gICAgICAgICAgICBhbHRlcm5hdGl2ZUNhbmRpZGF0ZUFuY2VzdG9ycy5wdXNoKHRoaXMuX2dldE5vZGVBbmNlc3RvcnModG9wQ2FuZGlkYXRlc1tpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgTUlOSU1VTV9UT1BDQU5ESURBVEVTID0gMztcbiAgICAgICAgaWYgKGFsdGVybmF0aXZlQ2FuZGlkYXRlQW5jZXN0b3JzLmxlbmd0aCA+PSBNSU5JTVVNX1RPUENBTkRJREFURVMpIHtcbiAgICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICAgIHdoaWxlIChwYXJlbnRPZlRvcENhbmRpZGF0ZS50YWdOYW1lICE9PSBcIkJPRFlcIikge1xuICAgICAgICAgICAgdmFyIGxpc3RzQ29udGFpbmluZ1RoaXNBbmNlc3RvciA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBhbmNlc3RvckluZGV4ID0gMDsgYW5jZXN0b3JJbmRleCA8IGFsdGVybmF0aXZlQ2FuZGlkYXRlQW5jZXN0b3JzLmxlbmd0aCAmJiBsaXN0c0NvbnRhaW5pbmdUaGlzQW5jZXN0b3IgPCBNSU5JTVVNX1RPUENBTkRJREFURVM7IGFuY2VzdG9ySW5kZXgrKykge1xuICAgICAgICAgICAgICBsaXN0c0NvbnRhaW5pbmdUaGlzQW5jZXN0b3IgKz0gTnVtYmVyKGFsdGVybmF0aXZlQ2FuZGlkYXRlQW5jZXN0b3JzW2FuY2VzdG9ySW5kZXhdLmluY2x1ZGVzKHBhcmVudE9mVG9wQ2FuZGlkYXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGlzdHNDb250YWluaW5nVGhpc0FuY2VzdG9yID49IE1JTklNVU1fVE9QQ0FORElEQVRFUykge1xuICAgICAgICAgICAgICB0b3BDYW5kaWRhdGUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5KSB7XG4gICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU5vZGUodG9wQ2FuZGlkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlY2F1c2Ugb2Ygb3VyIGJvbnVzIHN5c3RlbSwgcGFyZW50cyBvZiBjYW5kaWRhdGVzIG1pZ2h0IGhhdmUgc2NvcmVzXG4gICAgICAgIC8vIHRoZW1zZWx2ZXMuIFRoZXkgZ2V0IGhhbGYgb2YgdGhlIG5vZGUuIFRoZXJlIHdvbid0IGJlIG5vZGVzIHdpdGggaGlnaGVyXG4gICAgICAgIC8vIHNjb3JlcyB0aGFuIG91ciB0b3BDYW5kaWRhdGUsIGJ1dCBpZiB3ZSBzZWUgdGhlIHNjb3JlIGdvaW5nICp1cCogaW4gdGhlIGZpcnN0XG4gICAgICAgIC8vIGZldyBzdGVwcyB1cCB0aGUgdHJlZSwgdGhhdCdzIGEgZGVjZW50IHNpZ24gdGhhdCB0aGVyZSBtaWdodCBiZSBtb3JlIGNvbnRlbnRcbiAgICAgICAgLy8gbHVya2luZyBpbiBvdGhlciBwbGFjZXMgdGhhdCB3ZSB3YW50IHRvIHVuaWZ5IGluLiBUaGUgc2libGluZyBzdHVmZlxuICAgICAgICAvLyBiZWxvdyBkb2VzIHNvbWUgb2YgdGhhdCAtIGJ1dCBvbmx5IGlmIHdlJ3ZlIGxvb2tlZCBoaWdoIGVub3VnaCB1cCB0aGUgRE9NXG4gICAgICAgIC8vIHRyZWUuXG4gICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gdG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBsYXN0U2NvcmUgPSB0b3BDYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlO1xuICAgICAgICAvLyBUaGUgc2NvcmVzIHNob3VsZG4ndCBnZXQgdG9vIGxvdy5cbiAgICAgICAgdmFyIHNjb3JlVGhyZXNob2xkID0gbGFzdFNjb3JlIC8gMztcbiAgICAgICAgd2hpbGUgKHBhcmVudE9mVG9wQ2FuZGlkYXRlLnRhZ05hbWUgIT09IFwiQk9EWVwiKSB7XG4gICAgICAgICAgaWYgKCFwYXJlbnRPZlRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eSkge1xuICAgICAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwYXJlbnRTY29yZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZTtcbiAgICAgICAgICBpZiAocGFyZW50U2NvcmUgPCBzY29yZVRocmVzaG9sZClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGlmIChwYXJlbnRTY29yZSA+IGxhc3RTY29yZSkge1xuICAgICAgICAgICAgLy8gQWxyaWdodCEgV2UgZm91bmQgYSBiZXR0ZXIgcGFyZW50IHRvIHVzZS5cbiAgICAgICAgICAgIHRvcENhbmRpZGF0ZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhc3RTY29yZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZTtcbiAgICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgdG9wIGNhbmRpZGF0ZSBpcyB0aGUgb25seSBjaGlsZCwgdXNlIHBhcmVudCBpbnN0ZWFkLiBUaGlzIHdpbGwgaGVscCBzaWJsaW5nXG4gICAgICAgIC8vIGpvaW5pbmcgbG9naWMgd2hlbiBhZGphY2VudCBjb250ZW50IGlzIGFjdHVhbGx5IGxvY2F0ZWQgaW4gcGFyZW50J3Mgc2libGluZyBub2RlLlxuICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICB3aGlsZSAocGFyZW50T2ZUb3BDYW5kaWRhdGUudGFnTmFtZSAhPSBcIkJPRFlcIiAmJiBwYXJlbnRPZlRvcENhbmRpZGF0ZS5jaGlsZHJlbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIHRvcENhbmRpZGF0ZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlO1xuICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gdG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b3BDYW5kaWRhdGUucmVhZGFiaWxpdHkpIHtcbiAgICAgICAgICB0aGlzLl9pbml0aWFsaXplTm9kZSh0b3BDYW5kaWRhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgdGhlIHRvcCBjYW5kaWRhdGUsIGxvb2sgdGhyb3VnaCBpdHMgc2libGluZ3MgZm9yIGNvbnRlbnRcbiAgICAgIC8vIHRoYXQgbWlnaHQgYWxzbyBiZSByZWxhdGVkLiBUaGluZ3MgbGlrZSBwcmVhbWJsZXMsIGNvbnRlbnQgc3BsaXQgYnkgYWRzXG4gICAgICAvLyB0aGF0IHdlIHJlbW92ZWQsIGV0Yy5cbiAgICAgIHZhciBhcnRpY2xlQ29udGVudCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgaWYgKGlzUGFnaW5nKVxuICAgICAgICBhcnRpY2xlQ29udGVudC5pZCA9IFwicmVhZGFiaWxpdHktY29udGVudFwiO1xuXG4gICAgICB2YXIgc2libGluZ1Njb3JlVGhyZXNob2xkID0gTWF0aC5tYXgoMTAsIHRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKiAwLjIpO1xuICAgICAgLy8gS2VlcCBwb3RlbnRpYWwgdG9wIGNhbmRpZGF0ZSdzIHBhcmVudCBub2RlIHRvIHRyeSB0byBnZXQgdGV4dCBkaXJlY3Rpb24gb2YgaXQgbGF0ZXIuXG4gICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgdmFyIHNpYmxpbmdzID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUuY2hpbGRyZW47XG5cbiAgICAgIGZvciAodmFyIHMgPSAwLCBzbCA9IHNpYmxpbmdzLmxlbmd0aDsgcyA8IHNsOyBzKyspIHtcbiAgICAgICAgdmFyIHNpYmxpbmcgPSBzaWJsaW5nc1tzXTtcbiAgICAgICAgdmFyIGFwcGVuZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubG9nKFwiTG9va2luZyBhdCBzaWJsaW5nIG5vZGU6XCIsIHNpYmxpbmcsIHNpYmxpbmcucmVhZGFiaWxpdHkgPyAoXCJ3aXRoIHNjb3JlIFwiICsgc2libGluZy5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUpIDogXCJcIik7XG4gICAgICAgIHRoaXMubG9nKFwiU2libGluZyBoYXMgc2NvcmVcIiwgc2libGluZy5yZWFkYWJpbGl0eSA/IHNpYmxpbmcucmVhZGFiaWxpdHkuY29udGVudFNjb3JlIDogXCJVbmtub3duXCIpO1xuXG4gICAgICAgIGlmIChzaWJsaW5nID09PSB0b3BDYW5kaWRhdGUpIHtcbiAgICAgICAgICBhcHBlbmQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjb250ZW50Qm9udXMgPSAwO1xuXG4gICAgICAgICAgLy8gR2l2ZSBhIGJvbnVzIGlmIHNpYmxpbmcgbm9kZXMgYW5kIHRvcCBjYW5kaWRhdGVzIGhhdmUgdGhlIGV4YW1wbGUgc2FtZSBjbGFzc25hbWVcbiAgICAgICAgICBpZiAoc2libGluZy5jbGFzc05hbWUgPT09IHRvcENhbmRpZGF0ZS5jbGFzc05hbWUgJiYgdG9wQ2FuZGlkYXRlLmNsYXNzTmFtZSAhPT0gXCJcIilcbiAgICAgICAgICAgIGNvbnRlbnRCb251cyArPSB0b3BDYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICogMC4yO1xuXG4gICAgICAgICAgaWYgKHNpYmxpbmcucmVhZGFiaWxpdHkgJiZcbiAgICAgICAgICAgICAgKChzaWJsaW5nLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSArIGNvbnRlbnRCb251cykgPj0gc2libGluZ1Njb3JlVGhyZXNob2xkKSkge1xuICAgICAgICAgICAgYXBwZW5kID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNpYmxpbmcubm9kZU5hbWUgPT09IFwiUFwiKSB7XG4gICAgICAgICAgICB2YXIgbGlua0RlbnNpdHkgPSB0aGlzLl9nZXRMaW5rRGVuc2l0eShzaWJsaW5nKTtcbiAgICAgICAgICAgIHZhciBub2RlQ29udGVudCA9IHRoaXMuX2dldElubmVyVGV4dChzaWJsaW5nKTtcbiAgICAgICAgICAgIHZhciBub2RlTGVuZ3RoID0gbm9kZUNvbnRlbnQubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobm9kZUxlbmd0aCA+IDgwICYmIGxpbmtEZW5zaXR5IDwgMC4yNSkge1xuICAgICAgICAgICAgICBhcHBlbmQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlTGVuZ3RoIDwgODAgJiYgbm9kZUxlbmd0aCA+IDAgJiYgbGlua0RlbnNpdHkgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvbnRlbnQuc2VhcmNoKC9cXC4oIHwkKS8pICE9PSAtMSkge1xuICAgICAgICAgICAgICBhcHBlbmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcHBlbmQpIHtcbiAgICAgICAgICB0aGlzLmxvZyhcIkFwcGVuZGluZyBub2RlOlwiLCBzaWJsaW5nKTtcblxuICAgICAgICAgIGlmICh0aGlzLkFMVEVSX1RPX0RJVl9FWENFUFRJT05TLmluZGV4T2Yoc2libGluZy5ub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIGEgbm9kZSB0aGF0IGlzbid0IGEgY29tbW9uIGJsb2NrIGxldmVsIGVsZW1lbnQsIGxpa2UgYSBmb3JtIG9yIHRkIHRhZy5cbiAgICAgICAgICAgIC8vIFR1cm4gaXQgaW50byBhIGRpdiBzbyBpdCBkb2Vzbid0IGdldCBmaWx0ZXJlZCBvdXQgbGF0ZXIgYnkgYWNjaWRlbnQuXG4gICAgICAgICAgICB0aGlzLmxvZyhcIkFsdGVyaW5nIHNpYmxpbmc6XCIsIHNpYmxpbmcsIFwidG8gZGl2LlwiKTtcblxuICAgICAgICAgICAgc2libGluZyA9IHRoaXMuX3NldE5vZGVUYWcoc2libGluZywgXCJESVZcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXJ0aWNsZUNvbnRlbnQuYXBwZW5kQ2hpbGQoc2libGluZyk7XG4gICAgICAgICAgLy8gRmV0Y2ggY2hpbGRyZW4gYWdhaW4gdG8gbWFrZSBpdCBjb21wYXRpYmxlXG4gICAgICAgICAgLy8gd2l0aCBET00gcGFyc2VycyB3aXRob3V0IGxpdmUgY29sbGVjdGlvbiBzdXBwb3J0LlxuICAgICAgICAgIHNpYmxpbmdzID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUuY2hpbGRyZW47XG4gICAgICAgICAgLy8gc2libGluZ3MgaXMgYSByZWZlcmVuY2UgdG8gdGhlIGNoaWxkcmVuIGFycmF5LCBhbmRcbiAgICAgICAgICAvLyBzaWJsaW5nIGlzIHJlbW92ZWQgZnJvbSB0aGUgYXJyYXkgd2hlbiB3ZSBjYWxsIGFwcGVuZENoaWxkKCkuXG4gICAgICAgICAgLy8gQXMgYSByZXN1bHQsIHdlIG11c3QgcmV2aXNpdCB0aGlzIGluZGV4IHNpbmNlIHRoZSBub2Rlc1xuICAgICAgICAgIC8vIGhhdmUgYmVlbiBzaGlmdGVkLlxuICAgICAgICAgIHMgLT0gMTtcbiAgICAgICAgICBzbCAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9kZWJ1ZylcbiAgICAgICAgdGhpcy5sb2coXCJBcnRpY2xlIGNvbnRlbnQgcHJlLXByZXA6IFwiICsgYXJ0aWNsZUNvbnRlbnQuaW5uZXJIVE1MKTtcbiAgICAgIC8vIFNvIHdlIGhhdmUgYWxsIG9mIHRoZSBjb250ZW50IHRoYXQgd2UgbmVlZC4gTm93IHdlIGNsZWFuIGl0IHVwIGZvciBwcmVzZW50YXRpb24uXG4gICAgICB0aGlzLl9wcmVwQXJ0aWNsZShhcnRpY2xlQ29udGVudCk7XG4gICAgICBpZiAodGhpcy5fZGVidWcpXG4gICAgICAgIHRoaXMubG9nKFwiQXJ0aWNsZSBjb250ZW50IHBvc3QtcHJlcDogXCIgKyBhcnRpY2xlQ29udGVudC5pbm5lckhUTUwpO1xuXG4gICAgICBpZiAobmVlZGVkVG9DcmVhdGVUb3BDYW5kaWRhdGUpIHtcbiAgICAgICAgLy8gV2UgYWxyZWFkeSBjcmVhdGVkIGEgZmFrZSBkaXYgdGhpbmcsIGFuZCB0aGVyZSB3b3VsZG4ndCBoYXZlIGJlZW4gYW55IHNpYmxpbmdzIGxlZnRcbiAgICAgICAgLy8gZm9yIHRoZSBwcmV2aW91cyBsb29wLCBzbyB0aGVyZSdzIG5vIHBvaW50IHRyeWluZyB0byBjcmVhdGUgYSBuZXcgZGl2LCBhbmQgdGhlblxuICAgICAgICAvLyBtb3ZlIGFsbCB0aGUgY2hpbGRyZW4gb3Zlci4gSnVzdCBhc3NpZ24gSURzIGFuZCBjbGFzcyBuYW1lcyBoZXJlLiBObyBuZWVkIHRvIGFwcGVuZFxuICAgICAgICAvLyBiZWNhdXNlIHRoYXQgYWxyZWFkeSBoYXBwZW5lZCBhbnl3YXkuXG4gICAgICAgIHRvcENhbmRpZGF0ZS5pZCA9IFwicmVhZGFiaWxpdHktcGFnZS0xXCI7XG4gICAgICAgIHRvcENhbmRpZGF0ZS5jbGFzc05hbWUgPSBcInBhZ2VcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgZGl2LmlkID0gXCJyZWFkYWJpbGl0eS1wYWdlLTFcIjtcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicGFnZVwiO1xuICAgICAgICB3aGlsZSAoYXJ0aWNsZUNvbnRlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChhcnRpY2xlQ29udGVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBhcnRpY2xlQ29udGVudC5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZGVidWcpXG4gICAgICAgIHRoaXMubG9nKFwiQXJ0aWNsZSBjb250ZW50IGFmdGVyIHBhZ2luZzogXCIgKyBhcnRpY2xlQ29udGVudC5pbm5lckhUTUwpO1xuXG4gICAgICB2YXIgcGFyc2VTdWNjZXNzZnVsID0gdHJ1ZTtcblxuICAgICAgLy8gTm93IHRoYXQgd2UndmUgZ29uZSB0aHJvdWdoIHRoZSBmdWxsIGFsZ29yaXRobSwgY2hlY2sgdG8gc2VlIGlmXG4gICAgICAvLyB3ZSBnb3QgYW55IG1lYW5pbmdmdWwgY29udGVudC4gSWYgd2UgZGlkbid0LCB3ZSBtYXkgbmVlZCB0byByZS1ydW5cbiAgICAgIC8vIGdyYWJBcnRpY2xlIHdpdGggZGlmZmVyZW50IGZsYWdzIHNldC4gVGhpcyBnaXZlcyB1cyBhIGhpZ2hlciBsaWtlbGlob29kIG9mXG4gICAgICAvLyBmaW5kaW5nIHRoZSBjb250ZW50LCBhbmQgdGhlIHNpZXZlIGFwcHJvYWNoIGdpdmVzIHVzIGEgaGlnaGVyIGxpa2VsaWhvb2Qgb2ZcbiAgICAgIC8vIGZpbmRpbmcgdGhlIC1yaWdodC0gY29udGVudC5cbiAgICAgIHZhciB0ZXh0TGVuZ3RoID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGFydGljbGVDb250ZW50LCB0cnVlKS5sZW5ndGg7XG4gICAgICBpZiAodGV4dExlbmd0aCA8IHRoaXMuX2NoYXJUaHJlc2hvbGQpIHtcbiAgICAgICAgcGFyc2VTdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgICAgIHBhZ2UuaW5uZXJIVE1MID0gcGFnZUNhY2hlSHRtbDtcblxuICAgICAgICBpZiAodGhpcy5fZmxhZ0lzQWN0aXZlKHRoaXMuRkxBR19TVFJJUF9VTkxJS0VMWVMpKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRmxhZyh0aGlzLkZMQUdfU1RSSVBfVU5MSUtFTFlTKTtcbiAgICAgICAgICB0aGlzLl9hdHRlbXB0cy5wdXNoKHthcnRpY2xlQ29udGVudDogYXJ0aWNsZUNvbnRlbnQsIHRleHRMZW5ndGg6IHRleHRMZW5ndGh9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX1dFSUdIVF9DTEFTU0VTKSkge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUZsYWcodGhpcy5GTEFHX1dFSUdIVF9DTEFTU0VTKTtcbiAgICAgICAgICB0aGlzLl9hdHRlbXB0cy5wdXNoKHthcnRpY2xlQ29udGVudDogYXJ0aWNsZUNvbnRlbnQsIHRleHRMZW5ndGg6IHRleHRMZW5ndGh9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX0NMRUFOX0NPTkRJVElPTkFMTFkpKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRmxhZyh0aGlzLkZMQUdfQ0xFQU5fQ09ORElUSU9OQUxMWSk7XG4gICAgICAgICAgdGhpcy5fYXR0ZW1wdHMucHVzaCh7YXJ0aWNsZUNvbnRlbnQ6IGFydGljbGVDb250ZW50LCB0ZXh0TGVuZ3RoOiB0ZXh0TGVuZ3RofSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fYXR0ZW1wdHMucHVzaCh7YXJ0aWNsZUNvbnRlbnQ6IGFydGljbGVDb250ZW50LCB0ZXh0TGVuZ3RoOiB0ZXh0TGVuZ3RofSk7XG4gICAgICAgICAgLy8gTm8gbHVjayBhZnRlciByZW1vdmluZyBmbGFncywganVzdCByZXR1cm4gdGhlIGxvbmdlc3QgdGV4dCB3ZSBmb3VuZCBkdXJpbmcgdGhlIGRpZmZlcmVudCBsb29wc1xuICAgICAgICAgIHRoaXMuX2F0dGVtcHRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLnRleHRMZW5ndGggLSBhLnRleHRMZW5ndGg7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBCdXQgZmlyc3QgY2hlY2sgaWYgd2UgYWN0dWFsbHkgaGF2ZSBzb21ldGhpbmdcbiAgICAgICAgICBpZiAoIXRoaXMuX2F0dGVtcHRzWzBdLnRleHRMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFydGljbGVDb250ZW50ID0gdGhpcy5fYXR0ZW1wdHNbMF0uYXJ0aWNsZUNvbnRlbnQ7XG4gICAgICAgICAgcGFyc2VTdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGFyc2VTdWNjZXNzZnVsKSB7XG4gICAgICAgIC8vIEZpbmQgb3V0IHRleHQgZGlyZWN0aW9uIGZyb20gYW5jZXN0b3JzIG9mIGZpbmFsIHRvcCBjYW5kaWRhdGUuXG4gICAgICAgIHZhciBhbmNlc3RvcnMgPSBbcGFyZW50T2ZUb3BDYW5kaWRhdGUsIHRvcENhbmRpZGF0ZV0uY29uY2F0KHRoaXMuX2dldE5vZGVBbmNlc3RvcnMocGFyZW50T2ZUb3BDYW5kaWRhdGUpKTtcbiAgICAgICAgdGhpcy5fc29tZU5vZGUoYW5jZXN0b3JzLCBmdW5jdGlvbihhbmNlc3Rvcikge1xuICAgICAgICAgIGlmICghYW5jZXN0b3IudGFnTmFtZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB2YXIgYXJ0aWNsZURpciA9IGFuY2VzdG9yLmdldEF0dHJpYnV0ZShcImRpclwiKTtcbiAgICAgICAgICBpZiAoYXJ0aWNsZURpcikge1xuICAgICAgICAgICAgdGhpcy5fYXJ0aWNsZURpciA9IGFydGljbGVEaXI7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFydGljbGVDb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0aGUgaW5wdXQgc3RyaW5nIGNvdWxkIGJlIGEgYnlsaW5lLlxuICAgKiBUaGlzIHZlcmlmaWVzIHRoYXQgdGhlIGlucHV0IGlzIGEgc3RyaW5nLCBhbmQgdGhhdCB0aGUgbGVuZ3RoXG4gICAqIGlzIGxlc3MgdGhhbiAxMDAgY2hhcnMuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NzaWJsZUJ5bGluZSB7c3RyaW5nfSAtIGEgc3RyaW5nIHRvIGNoZWNrIHdoZXRoZXIgaXRzIGEgYnlsaW5lLlxuICAgKiBAcmV0dXJuIEJvb2xlYW4gLSB3aGV0aGVyIHRoZSBpbnB1dCBzdHJpbmcgaXMgYSBieWxpbmUuXG4gICAqL1xuICBfaXNWYWxpZEJ5bGluZTogZnVuY3Rpb24oYnlsaW5lKSB7XG4gICAgaWYgKHR5cGVvZiBieWxpbmUgPT0gXCJzdHJpbmdcIiB8fCBieWxpbmUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgIGJ5bGluZSA9IGJ5bGluZS50cmltKCk7XG4gICAgICByZXR1cm4gKGJ5bGluZS5sZW5ndGggPiAwKSAmJiAoYnlsaW5lLmxlbmd0aCA8IDEwMCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogQ29udmVydHMgc29tZSBvZiB0aGUgY29tbW9uIEhUTUwgZW50aXRpZXMgaW4gc3RyaW5nIHRvIHRoZWlyIGNvcnJlc3BvbmRpbmcgY2hhcmFjdGVycy5cbiAgICpcbiAgICogQHBhcmFtIHN0ciB7c3RyaW5nfSAtIGEgc3RyaW5nIHRvIHVuZXNjYXBlLlxuICAgKiBAcmV0dXJuIHN0cmluZyB3aXRob3V0IEhUTUwgZW50aXR5LlxuICAgKi9cbiAgX3VuZXNjYXBlSHRtbEVudGl0aWVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoIXN0cikge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgaHRtbEVzY2FwZU1hcCA9IHRoaXMuSFRNTF9FU0NBUEVfTUFQO1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJihxdW90fGFtcHxhcG9zfGx0fGd0KTsvZywgZnVuY3Rpb24oXywgdGFnKSB7XG4gICAgICByZXR1cm4gaHRtbEVzY2FwZU1hcFt0YWddO1xuICAgIH0pLnJlcGxhY2UoLyYjKD86eChbMC05YS16XXsxLDR9KXwoWzAtOV17MSw0fSkpOy9naSwgZnVuY3Rpb24oXywgaGV4LCBudW1TdHIpIHtcbiAgICAgIHZhciBudW0gPSBwYXJzZUludChoZXggfHwgbnVtU3RyLCBoZXggPyAxNiA6IDEwKTtcbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKG51bSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRyeSB0byBleHRyYWN0IG1ldGFkYXRhIGZyb20gSlNPTi1MRCBvYmplY3QuXG4gICAqIEZvciBub3csIG9ubHkgU2NoZW1hLm9yZyBvYmplY3RzIG9mIHR5cGUgQXJ0aWNsZSBvciBpdHMgc3VidHlwZXMgYXJlIHN1cHBvcnRlZC5cbiAgICogQHJldHVybiBPYmplY3Qgd2l0aCBhbnkgbWV0YWRhdGEgdGhhdCBjb3VsZCBiZSBleHRyYWN0ZWQgKHBvc3NpYmx5IG5vbmUpXG4gICAqL1xuICBfZ2V0SlNPTkxEOiBmdW5jdGlvbiAoZG9jKSB7XG4gICAgdmFyIHNjcmlwdHMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZG9jLCBbXCJzY3JpcHRcIl0pO1xuXG4gICAgdmFyIG1ldGFkYXRhO1xuXG4gICAgdGhpcy5fZm9yRWFjaE5vZGUoc2NyaXB0cywgZnVuY3Rpb24oanNvbkxkRWxlbWVudCkge1xuICAgICAgaWYgKCFtZXRhZGF0YSAmJiBqc29uTGRFbGVtZW50LmdldEF0dHJpYnV0ZShcInR5cGVcIikgPT09IFwiYXBwbGljYXRpb24vbGQranNvblwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gU3RyaXAgQ0RBVEEgbWFya2VycyBpZiBwcmVzZW50XG4gICAgICAgICAgdmFyIGNvbnRlbnQgPSBqc29uTGRFbGVtZW50LnRleHRDb250ZW50LnJlcGxhY2UoL15cXHMqPCFcXFtDREFUQVxcW3xcXF1cXF0+XFxzKiQvZywgXCJcIik7XG4gICAgICAgICAgdmFyIHBhcnNlZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXBhcnNlZFtcIkBjb250ZXh0XCJdIHx8XG4gICAgICAgICAgICAhcGFyc2VkW1wiQGNvbnRleHRcIl0ubWF0Y2goL15odHRwcz9cXDpcXC9cXC9zY2hlbWFcXC5vcmckLylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBhcnNlZFtcIkB0eXBlXCJdICYmIEFycmF5LmlzQXJyYXkocGFyc2VkW1wiQGdyYXBoXCJdKSkge1xuICAgICAgICAgICAgcGFyc2VkID0gcGFyc2VkW1wiQGdyYXBoXCJdLmZpbmQoZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChpdFtcIkB0eXBlXCJdIHx8IFwiXCIpLm1hdGNoKFxuICAgICAgICAgICAgICAgIHRoaXMuUkVHRVhQUy5qc29uTGRBcnRpY2xlVHlwZXNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFwYXJzZWQgfHxcbiAgICAgICAgICAgICFwYXJzZWRbXCJAdHlwZVwiXSB8fFxuICAgICAgICAgICAgIXBhcnNlZFtcIkB0eXBlXCJdLm1hdGNoKHRoaXMuUkVHRVhQUy5qc29uTGRBcnRpY2xlVHlwZXMpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWV0YWRhdGEgPSB7fTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VkLm5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHBhcnNlZC5oZWFkbGluZSA9PT0gXCJzdHJpbmdcIiAmJiBwYXJzZWQubmFtZSAhPT0gcGFyc2VkLmhlYWRsaW5lKSB7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGJvdGggbmFtZSBhbmQgaGVhZGxpbmUgZWxlbWVudCBpbiB0aGUgSlNPTi1MRC4gVGhleSBzaG91bGQgYm90aCBiZSB0aGUgc2FtZSBidXQgc29tZSB3ZWJzaXRlcyBsaWtlIGFrdHVhbG5lLmN6XG4gICAgICAgICAgICAvLyBwdXQgdGhlaXIgb3duIG5hbWUgaW50byBcIm5hbWVcIiBhbmQgdGhlIGFydGljbGUgdGl0bGUgdG8gXCJoZWFkbGluZVwiIHdoaWNoIGNvbmZ1c2VzIFJlYWRhYmlsaXR5LiBTbyB3ZSB0cnkgdG8gY2hlY2sgaWYgZWl0aGVyXG4gICAgICAgICAgICAvLyBcIm5hbWVcIiBvciBcImhlYWRsaW5lXCIgY2xvc2VseSBtYXRjaGVzIHRoZSBodG1sIHRpdGxlLCBhbmQgaWYgc28sIHVzZSB0aGF0IG9uZS4gSWYgbm90LCB0aGVuIHdlIHVzZSBcIm5hbWVcIiBieSBkZWZhdWx0LlxuXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLl9nZXRBcnRpY2xlVGl0bGUoKTtcbiAgICAgICAgICAgIHZhciBuYW1lTWF0Y2hlcyA9IHRoaXMuX3RleHRTaW1pbGFyaXR5KHBhcnNlZC5uYW1lLCB0aXRsZSkgPiAwLjc1O1xuICAgICAgICAgICAgdmFyIGhlYWRsaW5lTWF0Y2hlcyA9IHRoaXMuX3RleHRTaW1pbGFyaXR5KHBhcnNlZC5oZWFkbGluZSwgdGl0bGUpID4gMC43NTtcblxuICAgICAgICAgICAgaWYgKGhlYWRsaW5lTWF0Y2hlcyAmJiAhbmFtZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgbWV0YWRhdGEudGl0bGUgPSBwYXJzZWQuaGVhZGxpbmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXRhZGF0YS50aXRsZSA9IHBhcnNlZC5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcnNlZC5uYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS50aXRsZSA9IHBhcnNlZC5uYW1lLnRyaW0oKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJzZWQuaGVhZGxpbmUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhLnRpdGxlID0gcGFyc2VkLmhlYWRsaW5lLnRyaW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcnNlZC5hdXRob3IpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VkLmF1dGhvci5uYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIG1ldGFkYXRhLmJ5bGluZSA9IHBhcnNlZC5hdXRob3IubmFtZS50cmltKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkLmF1dGhvcikgJiYgcGFyc2VkLmF1dGhvclswXSAmJiB0eXBlb2YgcGFyc2VkLmF1dGhvclswXS5uYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIG1ldGFkYXRhLmJ5bGluZSA9IHBhcnNlZC5hdXRob3JcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGF1dGhvcikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhvciAmJiB0eXBlb2YgYXV0aG9yLm5hbWUgPT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKGF1dGhvcikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhvci5uYW1lLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VkLmRlc2NyaXB0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS5leGNlcnB0ID0gcGFyc2VkLmRlc2NyaXB0aW9uLnRyaW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcGFyc2VkLnB1Ymxpc2hlciAmJlxuICAgICAgICAgICAgdHlwZW9mIHBhcnNlZC5wdWJsaXNoZXIubmFtZSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWV0YWRhdGEuc2l0ZU5hbWUgPSBwYXJzZWQucHVibGlzaGVyLm5hbWUudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlZC5kYXRlUHVibGlzaGVkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS5kYXRlUHVibGlzaGVkID0gcGFyc2VkLmRhdGVQdWJsaXNoZWQudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHRoaXMubG9nKGVyci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtZXRhZGF0YSA/IG1ldGFkYXRhIDoge307XG4gIH0sXG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGdldCBleGNlcnB0IGFuZCBieWxpbmUgbWV0YWRhdGEgZm9yIHRoZSBhcnRpY2xlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvbmxkIFx1MjAxNCBvYmplY3QgY29udGFpbmluZyBhbnkgbWV0YWRhdGEgdGhhdFxuICAgKiBjb3VsZCBiZSBleHRyYWN0ZWQgZnJvbSBKU09OLUxEIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiBPYmplY3Qgd2l0aCBvcHRpb25hbCBcImV4Y2VycHRcIiBhbmQgXCJieWxpbmVcIiBwcm9wZXJ0aWVzXG4gICAqL1xuICBfZ2V0QXJ0aWNsZU1ldGFkYXRhOiBmdW5jdGlvbihqc29ubGQpIHtcbiAgICB2YXIgbWV0YWRhdGEgPSB7fTtcbiAgICB2YXIgdmFsdWVzID0ge307XG4gICAgdmFyIG1ldGFFbGVtZW50cyA9IHRoaXMuX2RvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm1ldGFcIik7XG5cbiAgICAvLyBwcm9wZXJ0eSBpcyBhIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIHZhbHVlc1xuICAgIHZhciBwcm9wZXJ0eVBhdHRlcm4gPSAvXFxzKihhcnRpY2xlfGRjfGRjdGVybXxvZ3x0d2l0dGVyKVxccyo6XFxzKihhdXRob3J8Y3JlYXRvcnxkZXNjcmlwdGlvbnxwdWJsaXNoZWRfdGltZXx0aXRsZXxzaXRlX25hbWUpXFxzKi9naTtcblxuICAgIC8vIG5hbWUgaXMgYSBzaW5nbGUgdmFsdWVcbiAgICB2YXIgbmFtZVBhdHRlcm4gPSAvXlxccyooPzooZGN8ZGN0ZXJtfG9nfHR3aXR0ZXJ8d2VpYm86KGFydGljbGV8d2VicGFnZSkpXFxzKltcXC46XVxccyopPyhhdXRob3J8Y3JlYXRvcnxkZXNjcmlwdGlvbnx0aXRsZXxzaXRlX25hbWUpXFxzKiQvaTtcblxuICAgIC8vIEZpbmQgZGVzY3JpcHRpb24gdGFncy5cbiAgICB0aGlzLl9mb3JFYWNoTm9kZShtZXRhRWxlbWVudHMsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBlbGVtZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgIHZhciBlbGVtZW50UHJvcGVydHkgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInByb3BlcnR5XCIpO1xuICAgICAgdmFyIGNvbnRlbnQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik7XG4gICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG1hdGNoZXMgPSBudWxsO1xuICAgICAgdmFyIG5hbWUgPSBudWxsO1xuXG4gICAgICBpZiAoZWxlbWVudFByb3BlcnR5KSB7XG4gICAgICAgIG1hdGNoZXMgPSBlbGVtZW50UHJvcGVydHkubWF0Y2gocHJvcGVydHlQYXR0ZXJuKTtcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAvLyBDb252ZXJ0IHRvIGxvd2VyY2FzZSwgYW5kIHJlbW92ZSBhbnkgd2hpdGVzcGFjZVxuICAgICAgICAgIC8vIHNvIHdlIGNhbiBtYXRjaCBiZWxvdy5cbiAgICAgICAgICBuYW1lID0gbWF0Y2hlc1swXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgICAvLyBtdWx0aXBsZSBhdXRob3JzXG4gICAgICAgICAgdmFsdWVzW25hbWVdID0gY29udGVudC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghbWF0Y2hlcyAmJiBlbGVtZW50TmFtZSAmJiBuYW1lUGF0dGVybi50ZXN0KGVsZW1lbnROYW1lKSkge1xuICAgICAgICBuYW1lID0gZWxlbWVudE5hbWU7XG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgLy8gQ29udmVydCB0byBsb3dlcmNhc2UsIHJlbW92ZSBhbnkgd2hpdGVzcGFjZSwgYW5kIGNvbnZlcnQgZG90c1xuICAgICAgICAgIC8vIHRvIGNvbG9ucyBzbyB3ZSBjYW4gbWF0Y2ggYmVsb3cuXG4gICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgXCJcIikucmVwbGFjZSgvXFwuL2csIFwiOlwiKTtcbiAgICAgICAgICB2YWx1ZXNbbmFtZV0gPSBjb250ZW50LnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gZ2V0IHRpdGxlXG4gICAgbWV0YWRhdGEudGl0bGUgPSBqc29ubGQudGl0bGUgfHxcbiAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tcImRjOnRpdGxlXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJkY3Rlcm06dGl0bGVcIl0gfHxcbiAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tcIm9nOnRpdGxlXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJ3ZWlibzphcnRpY2xlOnRpdGxlXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJ3ZWlibzp3ZWJwYWdlOnRpdGxlXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJ0aXRsZVwiXSB8fFxuICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW1widHdpdHRlcjp0aXRsZVwiXTtcblxuICAgIGlmICghbWV0YWRhdGEudGl0bGUpIHtcbiAgICAgIG1ldGFkYXRhLnRpdGxlID0gdGhpcy5fZ2V0QXJ0aWNsZVRpdGxlKCk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGF1dGhvclxuICAgIG1ldGFkYXRhLmJ5bGluZSA9IGpzb25sZC5ieWxpbmUgfHxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJkYzpjcmVhdG9yXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW1wiZGN0ZXJtOmNyZWF0b3JcIl0gfHxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJhdXRob3JcIl07XG5cbiAgICAvLyBnZXQgZGVzY3JpcHRpb25cbiAgICBtZXRhZGF0YS5leGNlcnB0ID0ganNvbmxkLmV4Y2VycHQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW1wiZGM6ZGVzY3JpcHRpb25cIl0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW1wiZGN0ZXJtOmRlc2NyaXB0aW9uXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tcIm9nOmRlc2NyaXB0aW9uXCJdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tcIndlaWJvOmFydGljbGU6ZGVzY3JpcHRpb25cIl0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW1wid2VpYm86d2VicGFnZTpkZXNjcmlwdGlvblwiXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJkZXNjcmlwdGlvblwiXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCJdO1xuXG4gICAgLy8gZ2V0IHNpdGUgbmFtZVxuICAgIG1ldGFkYXRhLnNpdGVOYW1lID0ganNvbmxkLnNpdGVOYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbXCJvZzpzaXRlX25hbWVcIl07XG5cbiAgICAvLyBnZXQgYXJ0aWNsZSBwdWJsaXNoZWQgdGltZVxuICAgIG1ldGFkYXRhLnB1Ymxpc2hlZFRpbWUgPSBqc29ubGQuZGF0ZVB1Ymxpc2hlZCB8fFxuICAgICAgdmFsdWVzW1wiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiXSB8fCBudWxsO1xuXG4gICAgLy8gaW4gbWFueSBzaXRlcyB0aGUgbWV0YSB2YWx1ZSBpcyBlc2NhcGVkIHdpdGggSFRNTCBlbnRpdGllcyxcbiAgICAvLyBzbyBoZXJlIHdlIG5lZWQgdG8gdW5lc2NhcGUgaXRcbiAgICBtZXRhZGF0YS50aXRsZSA9IHRoaXMuX3VuZXNjYXBlSHRtbEVudGl0aWVzKG1ldGFkYXRhLnRpdGxlKTtcbiAgICBtZXRhZGF0YS5ieWxpbmUgPSB0aGlzLl91bmVzY2FwZUh0bWxFbnRpdGllcyhtZXRhZGF0YS5ieWxpbmUpO1xuICAgIG1ldGFkYXRhLmV4Y2VycHQgPSB0aGlzLl91bmVzY2FwZUh0bWxFbnRpdGllcyhtZXRhZGF0YS5leGNlcnB0KTtcbiAgICBtZXRhZGF0YS5zaXRlTmFtZSA9IHRoaXMuX3VuZXNjYXBlSHRtbEVudGl0aWVzKG1ldGFkYXRhLnNpdGVOYW1lKTtcbiAgICBtZXRhZGF0YS5wdWJsaXNoZWRUaW1lID0gdGhpcy5fdW5lc2NhcGVIdG1sRW50aXRpZXMobWV0YWRhdGEucHVibGlzaGVkVGltZSk7XG5cbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIG5vZGUgaXMgaW1hZ2UsIG9yIGlmIG5vZGUgY29udGFpbnMgZXhhY3RseSBvbmx5IG9uZSBpbWFnZVxuICAgKiB3aGV0aGVyIGFzIGEgZGlyZWN0IGNoaWxkIG9yIGFzIGl0cyBkZXNjZW5kYW50cy5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgKiovXG4gIF9pc1NpbmdsZUltYWdlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gXCJJTUdcIikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoICE9PSAxIHx8IG5vZGUudGV4dENvbnRlbnQudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2lzU2luZ2xlSW1hZ2Uobm9kZS5jaGlsZHJlblswXSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIDxub3NjcmlwdD4gdGhhdCBhcmUgbG9jYXRlZCBhZnRlciA8aW1nPiBub2RlcywgYW5kIHdoaWNoIGNvbnRhaW4gb25seSBvbmVcbiAgICogPGltZz4gZWxlbWVudC4gUmVwbGFjZSB0aGUgZmlyc3QgaW1hZ2Ugd2l0aCB0aGUgaW1hZ2UgZnJvbSBpbnNpZGUgdGhlIDxub3NjcmlwdD4gdGFnLFxuICAgKiBhbmQgcmVtb3ZlIHRoZSA8bm9zY3JpcHQ+IHRhZy4gVGhpcyBpbXByb3ZlcyB0aGUgcXVhbGl0eSBvZiB0aGUgaW1hZ2VzIHdlIHVzZSBvblxuICAgKiBzb21lIHNpdGVzIChlLmcuIE1lZGl1bSkuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICoqL1xuICBfdW53cmFwTm9zY3JpcHRJbWFnZXM6IGZ1bmN0aW9uKGRvYykge1xuICAgIC8vIEZpbmQgaW1nIHdpdGhvdXQgc291cmNlIG9yIGF0dHJpYnV0ZXMgdGhhdCBtaWdodCBjb250YWlucyBpbWFnZSwgYW5kIHJlbW92ZSBpdC5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcHJldmVudCBhIHBsYWNlaG9sZGVyIGltZyBpcyByZXBsYWNlZCBieSBpbWcgZnJvbSBub3NjcmlwdCBpbiBuZXh0IHN0ZXAuXG4gICAgdmFyIGltZ3MgPSBBcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKSk7XG4gICAgdGhpcy5fZm9yRWFjaE5vZGUoaW1ncywgZnVuY3Rpb24oaW1nKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZy5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyID0gaW1nLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgIHN3aXRjaCAoYXR0ci5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBcInNyY1wiOlxuICAgICAgICAgIGNhc2UgXCJzcmNzZXRcIjpcbiAgICAgICAgICBjYXNlIFwiZGF0YS1zcmNcIjpcbiAgICAgICAgICBjYXNlIFwiZGF0YS1zcmNzZXRcIjpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgvXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwKS9pLnRlc3QoYXR0ci52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcbiAgICB9KTtcblxuICAgIC8vIE5leHQgZmluZCBub3NjcmlwdCBhbmQgdHJ5IHRvIGV4dHJhY3QgaXRzIGltYWdlXG4gICAgdmFyIG5vc2NyaXB0cyA9IEFycmF5LmZyb20oZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibm9zY3JpcHRcIikpO1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKG5vc2NyaXB0cywgZnVuY3Rpb24obm9zY3JpcHQpIHtcbiAgICAgIC8vIFBhcnNlIGNvbnRlbnQgb2Ygbm9zY3JpcHQgYW5kIG1ha2Ugc3VyZSBpdCBvbmx5IGNvbnRhaW5zIGltYWdlXG4gICAgICB2YXIgdG1wID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0bXAuaW5uZXJIVE1MID0gbm9zY3JpcHQuaW5uZXJIVE1MO1xuICAgICAgaWYgKCF0aGlzLl9pc1NpbmdsZUltYWdlKHRtcCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBub3NjcmlwdCBoYXMgcHJldmlvdXMgc2libGluZyBhbmQgaXQgb25seSBjb250YWlucyBpbWFnZSxcbiAgICAgIC8vIHJlcGxhY2UgaXQgd2l0aCBub3NjcmlwdCBjb250ZW50LiBIb3dldmVyIHdlIGFsc28ga2VlcCBvbGRcbiAgICAgIC8vIGF0dHJpYnV0ZXMgdGhhdCBtaWdodCBjb250YWlucyBpbWFnZS5cbiAgICAgIHZhciBwcmV2RWxlbWVudCA9IG5vc2NyaXB0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAocHJldkVsZW1lbnQgJiYgdGhpcy5faXNTaW5nbGVJbWFnZShwcmV2RWxlbWVudCkpIHtcbiAgICAgICAgdmFyIHByZXZJbWcgPSBwcmV2RWxlbWVudDtcbiAgICAgICAgaWYgKHByZXZJbWcudGFnTmFtZSAhPT0gXCJJTUdcIikge1xuICAgICAgICAgIHByZXZJbWcgPSBwcmV2RWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdJbWcgPSB0bXAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIilbMF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJldkltZy5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGF0dHIgPSBwcmV2SW1nLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgICAgaWYgKGF0dHIudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRyLm5hbWUgPT09IFwic3JjXCIgfHwgYXR0ci5uYW1lID09PSBcInNyY3NldFwiIHx8IC9cXC4oanBnfGpwZWd8cG5nfHdlYnApL2kudGVzdChhdHRyLnZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKG5ld0ltZy5nZXRBdHRyaWJ1dGUoYXR0ci5uYW1lKSA9PT0gYXR0ci52YWx1ZSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgaWYgKG5ld0ltZy5oYXNBdHRyaWJ1dGUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgIGF0dHJOYW1lID0gXCJkYXRhLW9sZC1cIiArIGF0dHJOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBub3NjcmlwdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0bXAuZmlyc3RFbGVtZW50Q2hpbGQsIHByZXZFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBzY3JpcHQgdGFncyBmcm9tIHRoZSBkb2N1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgKiovXG4gIF9yZW1vdmVTY3JpcHRzOiBmdW5jdGlvbihkb2MpIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlcyh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZG9jLCBbXCJzY3JpcHRcIiwgXCJub3NjcmlwdFwiXSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGlzIG5vZGUgaGFzIG9ubHkgd2hpdGVzcGFjZSBhbmQgYSBzaW5nbGUgZWxlbWVudCB3aXRoIGdpdmVuIHRhZ1xuICAgKiBSZXR1cm5zIGZhbHNlIGlmIHRoZSBESVYgbm9kZSBjb250YWlucyBub24tZW1wdHkgdGV4dCBub2Rlc1xuICAgKiBvciBpZiBpdCBjb250YWlucyBubyBlbGVtZW50IHdpdGggZ2l2ZW4gdGFnIG9yIG1vcmUgdGhhbiAxIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEBwYXJhbSBzdHJpbmcgdGFnIG9mIGNoaWxkIGVsZW1lbnRcbiAgKiovXG4gIF9oYXNTaW5nbGVUYWdJbnNpZGVFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCB0YWcpIHtcbiAgICAvLyBUaGVyZSBzaG91bGQgYmUgZXhhY3RseSAxIGVsZW1lbnQgY2hpbGQgd2l0aCBnaXZlbiB0YWdcbiAgICBpZiAoZWxlbWVudC5jaGlsZHJlbi5sZW5ndGggIT0gMSB8fCBlbGVtZW50LmNoaWxkcmVuWzBdLnRhZ05hbWUgIT09IHRhZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFuZCB0aGVyZSBzaG91bGQgYmUgbm8gdGV4dCBub2RlcyB3aXRoIHJlYWwgY29udGVudFxuICAgIHJldHVybiAhdGhpcy5fc29tZU5vZGUoZWxlbWVudC5jaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gdGhpcy5URVhUX05PREUgJiZcbiAgICAgICAgICAgICB0aGlzLlJFR0VYUFMuaGFzQ29udGVudC50ZXN0KG5vZGUudGV4dENvbnRlbnQpO1xuICAgIH0pO1xuICB9LFxuXG4gIF9pc0VsZW1lbnRXaXRob3V0Q29udGVudDogZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSB0aGlzLkVMRU1FTlRfTk9ERSAmJlxuICAgICAgbm9kZS50ZXh0Q29udGVudC50cmltKCkubGVuZ3RoID09IDAgJiZcbiAgICAgIChub2RlLmNoaWxkcmVuLmxlbmd0aCA9PSAwIHx8XG4gICAgICAgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJyXCIpLmxlbmd0aCArIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoclwiKS5sZW5ndGgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBlbGVtZW50IGhhcyBhbnkgY2hpbGRyZW4gYmxvY2sgbGV2ZWwgZWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqL1xuICBfaGFzQ2hpbGRCbG9ja0VsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvbWVOb2RlKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuRElWX1RPX1BfRUxFTVMuaGFzKG5vZGUudGFnTmFtZSkgfHxcbiAgICAgICAgICAgICB0aGlzLl9oYXNDaGlsZEJsb2NrRWxlbWVudChub2RlKTtcbiAgICB9KTtcbiAgfSxcblxuICAvKioqXG4gICAqIERldGVybWluZSBpZiBhIG5vZGUgcXVhbGlmaWVzIGFzIHBocmFzaW5nIGNvbnRlbnQuXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0hUTUwvQ29udGVudF9jYXRlZ29yaWVzI1BocmFzaW5nX2NvbnRlbnRcbiAgKiovXG4gIF9pc1BocmFzaW5nQ29udGVudDogZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSB0aGlzLlRFWFRfTk9ERSB8fCB0aGlzLlBIUkFTSU5HX0VMRU1TLmluZGV4T2Yobm9kZS50YWdOYW1lKSAhPT0gLTEgfHxcbiAgICAgICgobm9kZS50YWdOYW1lID09PSBcIkFcIiB8fCBub2RlLnRhZ05hbWUgPT09IFwiREVMXCIgfHwgbm9kZS50YWdOYW1lID09PSBcIklOU1wiKSAmJlxuICAgICAgICB0aGlzLl9ldmVyeU5vZGUobm9kZS5jaGlsZE5vZGVzLCB0aGlzLl9pc1BocmFzaW5nQ29udGVudCkpO1xuICB9LFxuXG4gIF9pc1doaXRlc3BhY2U6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gKG5vZGUubm9kZVR5cGUgPT09IHRoaXMuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpLmxlbmd0aCA9PT0gMCkgfHxcbiAgICAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IHRoaXMuRUxFTUVOVF9OT0RFICYmIG5vZGUudGFnTmFtZSA9PT0gXCJCUlwiKTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBpbm5lciB0ZXh0IG9mIGEgbm9kZSAtIGNyb3NzIGJyb3dzZXIgY29tcGF0aWJseS5cbiAgICogVGhpcyBhbHNvIHN0cmlwcyBvdXQgYW55IGV4Y2VzcyB3aGl0ZXNwYWNlIHRvIGJlIGZvdW5kLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gQm9vbGVhbiBub3JtYWxpemVTcGFjZXMgKGRlZmF1bHQ6IHRydWUpXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICoqL1xuICBfZ2V0SW5uZXJUZXh0OiBmdW5jdGlvbihlLCBub3JtYWxpemVTcGFjZXMpIHtcbiAgICBub3JtYWxpemVTcGFjZXMgPSAodHlwZW9mIG5vcm1hbGl6ZVNwYWNlcyA9PT0gXCJ1bmRlZmluZWRcIikgPyB0cnVlIDogbm9ybWFsaXplU3BhY2VzO1xuICAgIHZhciB0ZXh0Q29udGVudCA9IGUudGV4dENvbnRlbnQudHJpbSgpO1xuXG4gICAgaWYgKG5vcm1hbGl6ZVNwYWNlcykge1xuICAgICAgcmV0dXJuIHRleHRDb250ZW50LnJlcGxhY2UodGhpcy5SRUdFWFBTLm5vcm1hbGl6ZSwgXCIgXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dENvbnRlbnQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIHRpbWVzIGEgc3RyaW5nIHMgYXBwZWFycyBpbiB0aGUgbm9kZSBlLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gc3RyaW5nIC0gd2hhdCB0byBzcGxpdCBvbi4gRGVmYXVsdCBpcyBcIixcIlxuICAgKiBAcmV0dXJuIG51bWJlciAoaW50ZWdlcilcbiAgKiovXG4gIF9nZXRDaGFyQ291bnQ6IGZ1bmN0aW9uKGUsIHMpIHtcbiAgICBzID0gcyB8fCBcIixcIjtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SW5uZXJUZXh0KGUpLnNwbGl0KHMpLmxlbmd0aCAtIDE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgc3R5bGUgYXR0cmlidXRlIG9uIGV2ZXJ5IGUgYW5kIHVuZGVyLlxuICAgKiBUT0RPOiBUZXN0IGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKCopIGlzIGZhc3Rlci5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICoqL1xuICBfY2xlYW5TdHlsZXM6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoIWUgfHwgZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwic3ZnXCIpXG4gICAgICByZXR1cm47XG5cbiAgICAvLyBSZW1vdmUgYHN0eWxlYCBhbmQgZGVwcmVjYXRlZCBwcmVzZW50YXRpb25hbCBhdHRyaWJ1dGVzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLlBSRVNFTlRBVElPTkFMX0FUVFJJQlVURVMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGUucmVtb3ZlQXR0cmlidXRlKHRoaXMuUFJFU0VOVEFUSU9OQUxfQVRUUklCVVRFU1tpXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuREVQUkVDQVRFRF9TSVpFX0FUVFJJQlVURV9FTEVNUy5pbmRleE9mKGUudGFnTmFtZSkgIT09IC0xKSB7XG4gICAgICBlLnJlbW92ZUF0dHJpYnV0ZShcIndpZHRoXCIpO1xuICAgICAgZS5yZW1vdmVBdHRyaWJ1dGUoXCJoZWlnaHRcIik7XG4gICAgfVxuXG4gICAgdmFyIGN1ciA9IGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGN1ciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2xlYW5TdHlsZXMoY3VyKTtcbiAgICAgIGN1ciA9IGN1ci5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlbnNpdHkgb2YgbGlua3MgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSBjb250ZW50XG4gICAqIFRoaXMgaXMgdGhlIGFtb3VudCBvZiB0ZXh0IHRoYXQgaXMgaW5zaWRlIGEgbGluayBkaXZpZGVkIGJ5IHRoZSB0b3RhbCB0ZXh0IGluIHRoZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIG51bWJlciAoZmxvYXQpXG4gICoqL1xuICBfZ2V0TGlua0RlbnNpdHk6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICB2YXIgdGV4dExlbmd0aCA9IHRoaXMuX2dldElubmVyVGV4dChlbGVtZW50KS5sZW5ndGg7XG4gICAgaWYgKHRleHRMZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gMDtcblxuICAgIHZhciBsaW5rTGVuZ3RoID0gMDtcblxuICAgIC8vIFhYWCBpbXBsZW1lbnQgX3JlZHVjZU5vZGVMaXN0P1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpLCBmdW5jdGlvbihsaW5rTm9kZSkge1xuICAgICAgdmFyIGhyZWYgPSBsaW5rTm9kZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgdmFyIGNvZWZmaWNpZW50ID0gaHJlZiAmJiB0aGlzLlJFR0VYUFMuaGFzaFVybC50ZXN0KGhyZWYpID8gMC4zIDogMTtcbiAgICAgIGxpbmtMZW5ndGggKz0gdGhpcy5fZ2V0SW5uZXJUZXh0KGxpbmtOb2RlKS5sZW5ndGggKiBjb2VmZmljaWVudDtcbiAgICB9KTtcblxuICAgIHJldHVybiBsaW5rTGVuZ3RoIC8gdGV4dExlbmd0aDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IGFuIGVsZW1lbnRzIGNsYXNzL2lkIHdlaWdodC4gVXNlcyByZWd1bGFyIGV4cHJlc3Npb25zIHRvIHRlbGwgaWYgdGhpc1xuICAgKiBlbGVtZW50IGxvb2tzIGdvb2Qgb3IgYmFkLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIG51bWJlciAoSW50ZWdlcilcbiAgKiovXG4gIF9nZXRDbGFzc1dlaWdodDogZnVuY3Rpb24oZSkge1xuICAgIGlmICghdGhpcy5fZmxhZ0lzQWN0aXZlKHRoaXMuRkxBR19XRUlHSFRfQ0xBU1NFUykpXG4gICAgICByZXR1cm4gMDtcblxuICAgIHZhciB3ZWlnaHQgPSAwO1xuXG4gICAgLy8gTG9vayBmb3IgYSBzcGVjaWFsIGNsYXNzbmFtZVxuICAgIGlmICh0eXBlb2YoZS5jbGFzc05hbWUpID09PSBcInN0cmluZ1wiICYmIGUuY2xhc3NOYW1lICE9PSBcIlwiKSB7XG4gICAgICBpZiAodGhpcy5SRUdFWFBTLm5lZ2F0aXZlLnRlc3QoZS5jbGFzc05hbWUpKVxuICAgICAgICB3ZWlnaHQgLT0gMjU7XG5cbiAgICAgIGlmICh0aGlzLlJFR0VYUFMucG9zaXRpdmUudGVzdChlLmNsYXNzTmFtZSkpXG4gICAgICAgIHdlaWdodCArPSAyNTtcbiAgICB9XG5cbiAgICAvLyBMb29rIGZvciBhIHNwZWNpYWwgSURcbiAgICBpZiAodHlwZW9mKGUuaWQpID09PSBcInN0cmluZ1wiICYmIGUuaWQgIT09IFwiXCIpIHtcbiAgICAgIGlmICh0aGlzLlJFR0VYUFMubmVnYXRpdmUudGVzdChlLmlkKSlcbiAgICAgICAgd2VpZ2h0IC09IDI1O1xuXG4gICAgICBpZiAodGhpcy5SRUdFWFBTLnBvc2l0aXZlLnRlc3QoZS5pZCkpXG4gICAgICAgIHdlaWdodCArPSAyNTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2VpZ2h0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBDbGVhbiBhIG5vZGUgb2YgYWxsIGVsZW1lbnRzIG9mIHR5cGUgXCJ0YWdcIi5cbiAgICogKFVubGVzcyBpdCdzIGEgeW91dHViZS92aW1lbyB2aWRlby4gUGVvcGxlIGxvdmUgbW92aWVzLilcbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHBhcmFtIHN0cmluZyB0YWcgdG8gY2xlYW5cbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX2NsZWFuOiBmdW5jdGlvbihlLCB0YWcpIHtcbiAgICB2YXIgaXNFbWJlZCA9IFtcIm9iamVjdFwiLCBcImVtYmVkXCIsIFwiaWZyYW1lXCJdLmluZGV4T2YodGFnKSAhPT0gLTE7XG5cbiAgICB0aGlzLl9yZW1vdmVOb2Rlcyh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZSwgW3RhZ10pLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAvLyBBbGxvdyB5b3V0dWJlIGFuZCB2aW1lbyB2aWRlb3MgdGhyb3VnaCBhcyBwZW9wbGUgdXN1YWxseSB3YW50IHRvIHNlZSB0aG9zZS5cbiAgICAgIGlmIChpc0VtYmVkKSB7XG4gICAgICAgIC8vIEZpcnN0LCBjaGVjayB0aGUgZWxlbWVudHMgYXR0cmlidXRlcyB0byBzZWUgaWYgYW55IG9mIHRoZW0gY29udGFpbiB5b3V0dWJlIG9yIHZpbWVvXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2FsbG93ZWRWaWRlb1JlZ2V4LnRlc3QoZWxlbWVudC5hdHRyaWJ1dGVzW2ldLnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvciBlbWJlZCB3aXRoIDxvYmplY3Q+IHRhZywgY2hlY2sgaW5uZXIgSFRNTCBhcyB3ZWxsLlxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSBcIm9iamVjdFwiICYmIHRoaXMuX2FsbG93ZWRWaWRlb1JlZ2V4LnRlc3QoZWxlbWVudC5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGdpdmVuIG5vZGUgaGFzIG9uZSBvZiBpdHMgYW5jZXN0b3IgdGFnIG5hbWUgbWF0Y2hpbmcgdGhlXG4gICAqIHByb3ZpZGVkIG9uZS5cbiAgICogQHBhcmFtICBIVE1MRWxlbWVudCBub2RlXG4gICAqIEBwYXJhbSAgU3RyaW5nICAgICAgdGFnTmFtZVxuICAgKiBAcGFyYW0gIE51bWJlciAgICAgIG1heERlcHRoXG4gICAqIEBwYXJhbSAgRnVuY3Rpb24gICAgZmlsdGVyRm4gYSBmaWx0ZXIgdG8gaW52b2tlIHRvIGRldGVybWluZSB3aGV0aGVyIHRoaXMgbm9kZSAnY291bnRzJ1xuICAgKiBAcmV0dXJuIEJvb2xlYW5cbiAgICovXG4gIF9oYXNBbmNlc3RvclRhZzogZnVuY3Rpb24obm9kZSwgdGFnTmFtZSwgbWF4RGVwdGgsIGZpbHRlckZuKSB7XG4gICAgbWF4RGVwdGggPSBtYXhEZXB0aCB8fCAzO1xuICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgdmFyIGRlcHRoID0gMDtcbiAgICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAobWF4RGVwdGggPiAwICYmIGRlcHRoID4gbWF4RGVwdGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChub2RlLnBhcmVudE5vZGUudGFnTmFtZSA9PT0gdGFnTmFtZSAmJiAoIWZpbHRlckZuIHx8IGZpbHRlckZuKG5vZGUucGFyZW50Tm9kZSkpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICBkZXB0aCsrO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBvYmplY3QgaW5kaWNhdGluZyBob3cgbWFueSByb3dzIGFuZCBjb2x1bW5zIHRoaXMgdGFibGUgaGFzLlxuICAgKi9cbiAgX2dldFJvd0FuZENvbHVtbkNvdW50OiBmdW5jdGlvbih0YWJsZSkge1xuICAgIHZhciByb3dzID0gMDtcbiAgICB2YXIgY29sdW1ucyA9IDA7XG4gICAgdmFyIHRycyA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidHJcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByb3dzcGFuID0gdHJzW2ldLmdldEF0dHJpYnV0ZShcInJvd3NwYW5cIikgfHwgMDtcbiAgICAgIGlmIChyb3dzcGFuKSB7XG4gICAgICAgIHJvd3NwYW4gPSBwYXJzZUludChyb3dzcGFuLCAxMCk7XG4gICAgICB9XG4gICAgICByb3dzICs9IChyb3dzcGFuIHx8IDEpO1xuXG4gICAgICAvLyBOb3cgbG9vayBmb3IgY29sdW1uLXJlbGF0ZWQgaW5mb1xuICAgICAgdmFyIGNvbHVtbnNJblRoaXNSb3cgPSAwO1xuICAgICAgdmFyIGNlbGxzID0gdHJzW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjb2xzcGFuID0gY2VsbHNbal0uZ2V0QXR0cmlidXRlKFwiY29sc3BhblwiKSB8fCAwO1xuICAgICAgICBpZiAoY29sc3Bhbikge1xuICAgICAgICAgIGNvbHNwYW4gPSBwYXJzZUludChjb2xzcGFuLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29sdW1uc0luVGhpc1JvdyArPSAoY29sc3BhbiB8fCAxKTtcbiAgICAgIH1cbiAgICAgIGNvbHVtbnMgPSBNYXRoLm1heChjb2x1bW5zLCBjb2x1bW5zSW5UaGlzUm93KTtcbiAgICB9XG4gICAgcmV0dXJuIHtyb3dzOiByb3dzLCBjb2x1bW5zOiBjb2x1bW5zfTtcbiAgfSxcblxuICAvKipcbiAgICogTG9vayBmb3IgJ2RhdGEnIChhcyBvcHBvc2VkIHRvICdsYXlvdXQnKSB0YWJsZXMsIGZvciB3aGljaCB3ZSB1c2VcbiAgICogc2ltaWxhciBjaGVja3MgYXNcbiAgICogaHR0cHM6Ly9zZWFyY2hmb3gub3JnL21vemlsbGEtY2VudHJhbC9yZXYvZjgyZDVjNTQ5ZjA0NmNiNjRjZTU2MDJiZmQ4OTRiN2FlODA3YzhmOC9hY2Nlc3NpYmxlL2dlbmVyaWMvVGFibGVBY2Nlc3NpYmxlLmNwcCMxOVxuICAgKi9cbiAgX21hcmtEYXRhVGFibGVzOiBmdW5jdGlvbihyb290KSB7XG4gICAgdmFyIHRhYmxlcyA9IHJvb3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0YWJsZVwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRhYmxlID0gdGFibGVzW2ldO1xuICAgICAgdmFyIHJvbGUgPSB0YWJsZS5nZXRBdHRyaWJ1dGUoXCJyb2xlXCIpO1xuICAgICAgaWYgKHJvbGUgPT0gXCJwcmVzZW50YXRpb25cIikge1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSBmYWxzZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgZGF0YXRhYmxlID0gdGFibGUuZ2V0QXR0cmlidXRlKFwiZGF0YXRhYmxlXCIpO1xuICAgICAgaWYgKGRhdGF0YWJsZSA9PSBcIjBcIikge1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSBmYWxzZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgc3VtbWFyeSA9IHRhYmxlLmdldEF0dHJpYnV0ZShcInN1bW1hcnlcIik7XG4gICAgICBpZiAoc3VtbWFyeSkge1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNhcHRpb24gPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNhcHRpb25cIilbMF07XG4gICAgICBpZiAoY2FwdGlvbiAmJiBjYXB0aW9uLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIHRhYmxlIGhhcyBhIGRlc2NlbmRhbnQgd2l0aCBhbnkgb2YgdGhlc2UgdGFncywgY29uc2lkZXIgYSBkYXRhIHRhYmxlOlxuICAgICAgdmFyIGRhdGFUYWJsZURlc2NlbmRhbnRzID0gW1wiY29sXCIsIFwiY29sZ3JvdXBcIiwgXCJ0Zm9vdFwiLCBcInRoZWFkXCIsIFwidGhcIl07XG4gICAgICB2YXIgZGVzY2VuZGFudEV4aXN0cyA9IGZ1bmN0aW9uKHRhZykge1xuICAgICAgICByZXR1cm4gISF0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpWzBdO1xuICAgICAgfTtcbiAgICAgIGlmIChkYXRhVGFibGVEZXNjZW5kYW50cy5zb21lKGRlc2NlbmRhbnRFeGlzdHMpKSB7XG4gICAgICAgIHRoaXMubG9nKFwiRGF0YSB0YWJsZSBiZWNhdXNlIGZvdW5kIGRhdGEteSBkZXNjZW5kYW50XCIpO1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gTmVzdGVkIHRhYmxlcyBpbmRpY2F0ZSBhIGxheW91dCB0YWJsZTpcbiAgICAgIGlmICh0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRhYmxlXCIpWzBdKSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNpemVJbmZvID0gdGhpcy5fZ2V0Um93QW5kQ29sdW1uQ291bnQodGFibGUpO1xuICAgICAgaWYgKHNpemVJbmZvLnJvd3MgPj0gMTAgfHwgc2l6ZUluZm8uY29sdW1ucyA+IDQpIHtcbiAgICAgICAgdGFibGUuX3JlYWRhYmlsaXR5RGF0YVRhYmxlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBOb3cganVzdCBnbyBieSBzaXplIGVudGlyZWx5OlxuICAgICAgdGFibGUuX3JlYWRhYmlsaXR5RGF0YVRhYmxlID0gc2l6ZUluZm8ucm93cyAqIHNpemVJbmZvLmNvbHVtbnMgPiAxMDtcbiAgICB9XG4gIH0sXG5cbiAgLyogY29udmVydCBpbWFnZXMgYW5kIGZpZ3VyZXMgdGhhdCBoYXZlIHByb3BlcnRpZXMgbGlrZSBkYXRhLXNyYyBpbnRvIGltYWdlcyB0aGF0IGNhbiBiZSBsb2FkZWQgd2l0aG91dCBKUyAqL1xuICBfZml4TGF6eUltYWdlczogZnVuY3Rpb24gKHJvb3QpIHtcbiAgICB0aGlzLl9mb3JFYWNoTm9kZSh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcocm9vdCwgW1wiaW1nXCIsIFwicGljdHVyZVwiLCBcImZpZ3VyZVwiXSksIGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAvLyBJbiBzb21lIHNpdGVzIChlLmcuIEtvdGFrdSksIHRoZXkgcHV0IDFweCBzcXVhcmUgaW1hZ2UgYXMgYmFzZTY0IGRhdGEgdXJpIGluIHRoZSBzcmMgYXR0cmlidXRlLlxuICAgICAgLy8gU28sIGhlcmUgd2UgY2hlY2sgaWYgdGhlIGRhdGEgdXJpIGlzIHRvbyBzaG9ydCwganVzdCBtaWdodCBhcyB3ZWxsIHJlbW92ZSBpdC5cbiAgICAgIGlmIChlbGVtLnNyYyAmJiB0aGlzLlJFR0VYUFMuYjY0RGF0YVVybC50ZXN0KGVsZW0uc3JjKSkge1xuICAgICAgICAvLyBNYWtlIHN1cmUgaXQncyBub3QgU1ZHLCBiZWNhdXNlIFNWRyBjYW4gaGF2ZSBhIG1lYW5pbmdmdWwgaW1hZ2UgaW4gdW5kZXIgMTMzIGJ5dGVzLlxuICAgICAgICB2YXIgcGFydHMgPSB0aGlzLlJFR0VYUFMuYjY0RGF0YVVybC5leGVjKGVsZW0uc3JjKTtcbiAgICAgICAgaWYgKHBhcnRzWzFdID09PSBcImltYWdlL3N2Zyt4bWxcIikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGVsZW1lbnQgaGFzIG90aGVyIGF0dHJpYnV0ZXMgd2hpY2ggY29udGFpbnMgaW1hZ2UuXG4gICAgICAgIC8vIElmIGl0IGRvZXNuJ3QsIHRoZW4gdGhpcyBzcmMgaXMgaW1wb3J0YW50IGFuZCBzaG91bGRuJ3QgYmUgcmVtb3ZlZC5cbiAgICAgICAgdmFyIHNyY0NvdWxkQmVSZW1vdmVkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGF0dHIgPSBlbGVtLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgICAgaWYgKGF0dHIubmFtZSA9PT0gXCJzcmNcIikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKC9cXC4oanBnfGpwZWd8cG5nfHdlYnApL2kudGVzdChhdHRyLnZhbHVlKSkge1xuICAgICAgICAgICAgc3JjQ291bGRCZVJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGVyZSB3ZSBhc3N1bWUgaWYgaW1hZ2UgaXMgbGVzcyB0aGFuIDEwMCBieXRlcyAob3IgMTMzQiBhZnRlciBlbmNvZGVkIHRvIGJhc2U2NClcbiAgICAgICAgLy8gaXQgd2lsbCBiZSB0b28gc21hbGwsIHRoZXJlZm9yZSBpdCBtaWdodCBiZSBwbGFjZWhvbGRlciBpbWFnZS5cbiAgICAgICAgaWYgKHNyY0NvdWxkQmVSZW1vdmVkKSB7XG4gICAgICAgICAgdmFyIGI2NHN0YXJ0cyA9IGVsZW0uc3JjLnNlYXJjaCgvYmFzZTY0XFxzKi9pKSArIDc7XG4gICAgICAgICAgdmFyIGI2NGxlbmd0aCA9IGVsZW0uc3JjLmxlbmd0aCAtIGI2NHN0YXJ0cztcbiAgICAgICAgICBpZiAoYjY0bGVuZ3RoIDwgMTMzKSB7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZShcInNyY1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYWxzbyBjaGVjayBmb3IgXCJudWxsXCIgdG8gd29yayBhcm91bmQgaHR0cHM6Ly9naXRodWIuY29tL2pzZG9tL2pzZG9tL2lzc3Vlcy8yNTgwXG4gICAgICBpZiAoKGVsZW0uc3JjIHx8IChlbGVtLnNyY3NldCAmJiBlbGVtLnNyY3NldCAhPSBcIm51bGxcIikpICYmIGVsZW0uY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImxhenlcIikgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBlbGVtLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgYXR0ciA9IGVsZW0uYXR0cmlidXRlc1tqXTtcbiAgICAgICAgaWYgKGF0dHIubmFtZSA9PT0gXCJzcmNcIiB8fCBhdHRyLm5hbWUgPT09IFwic3Jjc2V0XCIgfHwgYXR0ci5uYW1lID09PSBcImFsdFwiKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvcHlUbyA9IG51bGw7XG4gICAgICAgIGlmICgvXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwKVxccytcXGQvLnRlc3QoYXR0ci52YWx1ZSkpIHtcbiAgICAgICAgICBjb3B5VG8gPSBcInNyY3NldFwiO1xuICAgICAgICB9IGVsc2UgaWYgKC9eXFxzKlxcUytcXC4oanBnfGpwZWd8cG5nfHdlYnApXFxTKlxccyokLy50ZXN0KGF0dHIudmFsdWUpKSB7XG4gICAgICAgICAgY29weVRvID0gXCJzcmNcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29weVRvKSB7XG4gICAgICAgICAgLy9pZiB0aGlzIGlzIGFuIGltZyBvciBwaWN0dXJlLCBzZXQgdGhlIGF0dHJpYnV0ZSBkaXJlY3RseVxuICAgICAgICAgIGlmIChlbGVtLnRhZ05hbWUgPT09IFwiSU1HXCIgfHwgZWxlbS50YWdOYW1lID09PSBcIlBJQ1RVUkVcIikge1xuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoY29weVRvLCBhdHRyLnZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsZW0udGFnTmFtZSA9PT0gXCJGSUdVUkVcIiAmJiAhdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGVsZW0sIFtcImltZ1wiLCBcInBpY3R1cmVcIl0pLmxlbmd0aCkge1xuICAgICAgICAgICAgLy9pZiB0aGUgaXRlbSBpcyBhIDxmaWd1cmU+IHRoYXQgZG9lcyBub3QgY29udGFpbiBhbiBpbWFnZSBvciBwaWN0dXJlLCBjcmVhdGUgb25lIGFuZCBwbGFjZSBpdCBpbnNpZGUgdGhlIGZpZ3VyZVxuICAgICAgICAgICAgLy9zZWUgdGhlIG55dGltZXMtMyB0ZXN0Y2FzZSBmb3IgYW4gZXhhbXBsZVxuICAgICAgICAgICAgdmFyIGltZyA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShjb3B5VG8sIGF0dHIudmFsdWUpO1xuICAgICAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIF9nZXRUZXh0RGVuc2l0eTogZnVuY3Rpb24oZSwgdGFncykge1xuICAgIHZhciB0ZXh0TGVuZ3RoID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGUsIHRydWUpLmxlbmd0aDtcbiAgICBpZiAodGV4dExlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciBjaGlsZHJlbkxlbmd0aCA9IDA7XG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGUsIHRhZ3MpO1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKGNoaWxkcmVuLCAoY2hpbGQpID0+IGNoaWxkcmVuTGVuZ3RoICs9IHRoaXMuX2dldElubmVyVGV4dChjaGlsZCwgdHJ1ZSkubGVuZ3RoKTtcbiAgICByZXR1cm4gY2hpbGRyZW5MZW5ndGggLyB0ZXh0TGVuZ3RoO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDbGVhbiBhbiBlbGVtZW50IG9mIGFsbCB0YWdzIG9mIHR5cGUgXCJ0YWdcIiBpZiB0aGV5IGxvb2sgZmlzaHkuXG4gICAqIFwiRmlzaHlcIiBpcyBhbiBhbGdvcml0aG0gYmFzZWQgb24gY29udGVudCBsZW5ndGgsIGNsYXNzbmFtZXMsIGxpbmsgZGVuc2l0eSwgbnVtYmVyIG9mIGltYWdlcyAmIGVtYmVkcywgZXRjLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfY2xlYW5Db25kaXRpb25hbGx5OiBmdW5jdGlvbihlLCB0YWcpIHtcbiAgICBpZiAoIXRoaXMuX2ZsYWdJc0FjdGl2ZSh0aGlzLkZMQUdfQ0xFQU5fQ09ORElUSU9OQUxMWSkpXG4gICAgICByZXR1cm47XG5cbiAgICAvLyBHYXRoZXIgY291bnRzIGZvciBvdGhlciB0eXBpY2FsIGVsZW1lbnRzIGVtYmVkZGVkIHdpdGhpbi5cbiAgICAvLyBUcmF2ZXJzZSBiYWNrd2FyZHMgc28gd2UgY2FuIHJlbW92ZSBub2RlcyBhdCB0aGUgc2FtZSB0aW1lXG4gICAgLy8gd2l0aG91dCBlZmZlY3RpbmcgdGhlIHRyYXZlcnNhbC5cbiAgICAvL1xuICAgIC8vIFRPRE86IENvbnNpZGVyIHRha2luZyBpbnRvIGFjY291bnQgb3JpZ2luYWwgY29udGVudFNjb3JlIGhlcmUuXG4gICAgdGhpcy5fcmVtb3ZlTm9kZXModGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGUsIFt0YWddKSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgdGhpcyBub2RlIElTIGRhdGEgdGFibGUsIGluIHdoaWNoIGNhc2UgZG9uJ3QgcmVtb3ZlIGl0LlxuICAgICAgdmFyIGlzRGF0YVRhYmxlID0gZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC5fcmVhZGFiaWxpdHlEYXRhVGFibGU7XG4gICAgICB9O1xuXG4gICAgICB2YXIgaXNMaXN0ID0gdGFnID09PSBcInVsXCIgfHwgdGFnID09PSBcIm9sXCI7XG4gICAgICBpZiAoIWlzTGlzdCkge1xuICAgICAgICB2YXIgbGlzdExlbmd0aCA9IDA7XG4gICAgICAgIHZhciBsaXN0Tm9kZXMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcobm9kZSwgW1widWxcIiwgXCJvbFwiXSk7XG4gICAgICAgIHRoaXMuX2ZvckVhY2hOb2RlKGxpc3ROb2RlcywgKGxpc3QpID0+IGxpc3RMZW5ndGggKz0gdGhpcy5fZ2V0SW5uZXJUZXh0KGxpc3QpLmxlbmd0aCk7XG4gICAgICAgIGlzTGlzdCA9IGxpc3RMZW5ndGggLyB0aGlzLl9nZXRJbm5lclRleHQobm9kZSkubGVuZ3RoID4gMC45O1xuICAgICAgfVxuXG4gICAgICBpZiAodGFnID09PSBcInRhYmxlXCIgJiYgaXNEYXRhVGFibGUobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBOZXh0IGNoZWNrIGlmIHdlJ3JlIGluc2lkZSBhIGRhdGEgdGFibGUsIGluIHdoaWNoIGNhc2UgZG9uJ3QgcmVtb3ZlIGl0IGFzIHdlbGwuXG4gICAgICBpZiAodGhpcy5faGFzQW5jZXN0b3JUYWcobm9kZSwgXCJ0YWJsZVwiLCAtMSwgaXNEYXRhVGFibGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2hhc0FuY2VzdG9yVGFnKG5vZGUsIFwiY29kZVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciB3ZWlnaHQgPSB0aGlzLl9nZXRDbGFzc1dlaWdodChub2RlKTtcblxuICAgICAgdGhpcy5sb2coXCJDbGVhbmluZyBDb25kaXRpb25hbGx5XCIsIG5vZGUpO1xuXG4gICAgICB2YXIgY29udGVudFNjb3JlID0gMDtcblxuICAgICAgaWYgKHdlaWdodCArIGNvbnRlbnRTY29yZSA8IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9nZXRDaGFyQ291bnQobm9kZSwgXCIsXCIpIDwgMTApIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vdCB2ZXJ5IG1hbnkgY29tbWFzLCBhbmQgdGhlIG51bWJlciBvZlxuICAgICAgICAvLyBub24tcGFyYWdyYXBoIGVsZW1lbnRzIGlzIG1vcmUgdGhhbiBwYXJhZ3JhcGhzIG9yIG90aGVyXG4gICAgICAgIC8vIG9taW5vdXMgc2lnbnMsIHJlbW92ZSB0aGUgZWxlbWVudC5cbiAgICAgICAgdmFyIHAgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicFwiKS5sZW5ndGg7XG4gICAgICAgIHZhciBpbWcgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpLmxlbmd0aCAtIDEwMDtcbiAgICAgICAgdmFyIGlucHV0ID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIGhlYWRpbmdEZW5zaXR5ID0gdGhpcy5fZ2V0VGV4dERlbnNpdHkobm9kZSwgW1wiaDFcIiwgXCJoMlwiLCBcImgzXCIsIFwiaDRcIiwgXCJoNVwiLCBcImg2XCJdKTtcblxuICAgICAgICB2YXIgZW1iZWRDb3VudCA9IDA7XG4gICAgICAgIHZhciBlbWJlZHMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcobm9kZSwgW1wib2JqZWN0XCIsIFwiZW1iZWRcIiwgXCJpZnJhbWVcIl0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW1iZWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBlbWJlZCBoYXMgYXR0cmlidXRlIHRoYXQgbWF0Y2hlcyB2aWRlbyByZWdleCwgZG9uJ3QgZGVsZXRlIGl0LlxuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZW1iZWRzW2ldLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbGxvd2VkVmlkZW9SZWdleC50ZXN0KGVtYmVkc1tpXS5hdHRyaWJ1dGVzW2pdLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRm9yIGVtYmVkIHdpdGggPG9iamVjdD4gdGFnLCBjaGVjayBpbm5lciBIVE1MIGFzIHdlbGwuXG4gICAgICAgICAgaWYgKGVtYmVkc1tpXS50YWdOYW1lID09PSBcIm9iamVjdFwiICYmIHRoaXMuX2FsbG93ZWRWaWRlb1JlZ2V4LnRlc3QoZW1iZWRzW2ldLmlubmVySFRNTCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbWJlZENvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGlua0RlbnNpdHkgPSB0aGlzLl9nZXRMaW5rRGVuc2l0eShub2RlKTtcbiAgICAgICAgdmFyIGNvbnRlbnRMZW5ndGggPSB0aGlzLl9nZXRJbm5lclRleHQobm9kZSkubGVuZ3RoO1xuXG4gICAgICAgIHZhciBoYXZlVG9SZW1vdmUgPVxuICAgICAgICAgIChpbWcgPiAxICYmIHAgLyBpbWcgPCAwLjUgJiYgIXRoaXMuX2hhc0FuY2VzdG9yVGFnKG5vZGUsIFwiZmlndXJlXCIpKSB8fFxuICAgICAgICAgICghaXNMaXN0ICYmIGxpID4gcCkgfHxcbiAgICAgICAgICAoaW5wdXQgPiBNYXRoLmZsb29yKHAvMykpIHx8XG4gICAgICAgICAgKCFpc0xpc3QgJiYgaGVhZGluZ0RlbnNpdHkgPCAwLjkgJiYgY29udGVudExlbmd0aCA8IDI1ICYmIChpbWcgPT09IDAgfHwgaW1nID4gMikgJiYgIXRoaXMuX2hhc0FuY2VzdG9yVGFnKG5vZGUsIFwiZmlndXJlXCIpKSB8fFxuICAgICAgICAgICghaXNMaXN0ICYmIHdlaWdodCA8IDI1ICYmIGxpbmtEZW5zaXR5ID4gMC4yKSB8fFxuICAgICAgICAgICh3ZWlnaHQgPj0gMjUgJiYgbGlua0RlbnNpdHkgPiAwLjUpIHx8XG4gICAgICAgICAgKChlbWJlZENvdW50ID09PSAxICYmIGNvbnRlbnRMZW5ndGggPCA3NSkgfHwgZW1iZWRDb3VudCA+IDEpO1xuICAgICAgICAvLyBBbGxvdyBzaW1wbGUgbGlzdHMgb2YgaW1hZ2VzIHRvIHJlbWFpbiBpbiBwYWdlc1xuICAgICAgICBpZiAoaXNMaXN0ICYmIGhhdmVUb1JlbW92ZSkge1xuICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZHJlblt4XTtcbiAgICAgICAgICAgIC8vIERvbid0IGZpbHRlciBpbiBsaXN0cyB3aXRoIGxpJ3MgdGhhdCBjb250YWluIG1vcmUgdGhhbiBvbmUgY2hpbGRcbiAgICAgICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYXZlVG9SZW1vdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBsaV9jb3VudCA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKS5sZW5ndGg7XG4gICAgICAgICAgLy8gT25seSBhbGxvdyB0aGUgbGlzdCB0byByZW1haW4gaWYgZXZlcnkgbGkgY29udGFpbnMgYW4gaW1hZ2VcbiAgICAgICAgICBpZiAoaW1nID09IGxpX2NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXZlVG9SZW1vdmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsZWFuIG91dCBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBzcGVjaWZpZWQgY29uZGl0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gRnVuY3Rpb24gZGV0ZXJtaW5lcyB3aGV0aGVyIGEgbm9kZSBzaG91bGQgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfY2xlYW5NYXRjaGVkTm9kZXM6IGZ1bmN0aW9uKGUsIGZpbHRlcikge1xuICAgIHZhciBlbmRPZlNlYXJjaE1hcmtlck5vZGUgPSB0aGlzLl9nZXROZXh0Tm9kZShlLCB0cnVlKTtcbiAgICB2YXIgbmV4dCA9IHRoaXMuX2dldE5leHROb2RlKGUpO1xuICAgIHdoaWxlIChuZXh0ICYmIG5leHQgIT0gZW5kT2ZTZWFyY2hNYXJrZXJOb2RlKSB7XG4gICAgICBpZiAoZmlsdGVyLmNhbGwodGhpcywgbmV4dCwgbmV4dC5jbGFzc05hbWUgKyBcIiBcIiArIG5leHQuaWQpKSB7XG4gICAgICAgIG5leHQgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5leHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCA9IHRoaXMuX2dldE5leHROb2RlKG5leHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQ2xlYW4gb3V0IHNwdXJpb3VzIGhlYWRlcnMgZnJvbSBhbiBFbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgKiovXG4gIF9jbGVhbkhlYWRlcnM6IGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgaGVhZGluZ05vZGVzID0gdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGUsIFtcImgxXCIsIFwiaDJcIl0pO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzKGhlYWRpbmdOb2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgbGV0IHNob3VsZFJlbW92ZSA9IHRoaXMuX2dldENsYXNzV2VpZ2h0KG5vZGUpIDwgMDtcbiAgICAgIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgICAgdGhpcy5sb2coXCJSZW1vdmluZyBoZWFkZXIgd2l0aCBsb3cgY2xhc3Mgd2VpZ2h0OlwiLCBub2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaG91bGRSZW1vdmU7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgbm9kZSBpcyBhbiBIMSBvciBIMiBlbGVtZW50IHdob3NlIGNvbnRlbnQgaXMgbW9zdGx5XG4gICAqIHRoZSBzYW1lIGFzIHRoZSBhcnRpY2xlIHRpdGxlLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudCAgdGhlIG5vZGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBpcyBhIHRpdGxlLWxpa2UgaGVhZGVyLlxuICAgKi9cbiAgX2hlYWRlckR1cGxpY2F0ZXNUaXRsZTogZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnRhZ05hbWUgIT0gXCJIMVwiICYmIG5vZGUudGFnTmFtZSAhPSBcIkgyXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGhlYWRpbmcgPSB0aGlzLl9nZXRJbm5lclRleHQobm9kZSwgZmFsc2UpO1xuICAgIHRoaXMubG9nKFwiRXZhbHVhdGluZyBzaW1pbGFyaXR5IG9mIGhlYWRlcjpcIiwgaGVhZGluZywgdGhpcy5fYXJ0aWNsZVRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy5fdGV4dFNpbWlsYXJpdHkodGhpcy5fYXJ0aWNsZVRpdGxlLCBoZWFkaW5nKSA+IDAuNzU7XG4gIH0sXG5cbiAgX2ZsYWdJc0FjdGl2ZTogZnVuY3Rpb24oZmxhZykge1xuICAgIHJldHVybiAodGhpcy5fZmxhZ3MgJiBmbGFnKSA+IDA7XG4gIH0sXG5cbiAgX3JlbW92ZUZsYWc6IGZ1bmN0aW9uKGZsYWcpIHtcbiAgICB0aGlzLl9mbGFncyA9IHRoaXMuX2ZsYWdzICYgfmZsYWc7XG4gIH0sXG5cbiAgX2lzUHJvYmFibHlWaXNpYmxlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgLy8gSGF2ZSB0byBudWxsLWNoZWNrIG5vZGUuc3R5bGUgYW5kIG5vZGUuY2xhc3NOYW1lLmluZGV4T2YgdG8gZGVhbCB3aXRoIFNWRyBhbmQgTWF0aE1MIG5vZGVzLlxuICAgIHJldHVybiAoIW5vZGUuc3R5bGUgfHwgbm9kZS5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKVxuICAgICAgJiYgKCFub2RlLnN0eWxlIHx8IG5vZGUuc3R5bGUudmlzaWJpbGl0eSAhPSBcImhpZGRlblwiKVxuICAgICAgJiYgIW5vZGUuaGFzQXR0cmlidXRlKFwiaGlkZGVuXCIpXG4gICAgICAvL2NoZWNrIGZvciBcImZhbGxiYWNrLWltYWdlXCIgc28gdGhhdCB3aWtpbWVkaWEgbWF0aCBpbWFnZXMgYXJlIGRpc3BsYXllZFxuICAgICAgJiYgKCFub2RlLmhhc0F0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpIHx8IG5vZGUuZ2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgIT0gXCJ0cnVlXCIgfHwgKG5vZGUuY2xhc3NOYW1lICYmIG5vZGUuY2xhc3NOYW1lLmluZGV4T2YgJiYgbm9kZS5jbGFzc05hbWUuaW5kZXhPZihcImZhbGxiYWNrLWltYWdlXCIpICE9PSAtMSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSdW5zIHJlYWRhYmlsaXR5LlxuICAgKlxuICAgKiBXb3JrZmxvdzpcbiAgICogIDEuIFByZXAgdGhlIGRvY3VtZW50IGJ5IHJlbW92aW5nIHNjcmlwdCB0YWdzLCBjc3MsIGV0Yy5cbiAgICogIDIuIEJ1aWxkIHJlYWRhYmlsaXR5J3MgRE9NIHRyZWUuXG4gICAqICAzLiBHcmFiIHRoZSBhcnRpY2xlIGNvbnRlbnQgZnJvbSB0aGUgY3VycmVudCBkb20gdHJlZS5cbiAgICogIDQuIFJlcGxhY2UgdGhlIGN1cnJlbnQgRE9NIHRyZWUgd2l0aCB0aGUgbmV3IG9uZS5cbiAgICogIDUuIFJlYWQgcGVhY2VmdWxseS5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgcGFyc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBBdm9pZCBwYXJzaW5nIHRvbyBsYXJnZSBkb2N1bWVudHMsIGFzIHBlciBjb25maWd1cmF0aW9uIG9wdGlvblxuICAgIGlmICh0aGlzLl9tYXhFbGVtc1RvUGFyc2UgPiAwKSB7XG4gICAgICB2YXIgbnVtVGFncyA9IHRoaXMuX2RvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuICAgICAgaWYgKG51bVRhZ3MgPiB0aGlzLl9tYXhFbGVtc1RvUGFyc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWJvcnRpbmcgcGFyc2luZyBkb2N1bWVudDsgXCIgKyBudW1UYWdzICsgXCIgZWxlbWVudHMgZm91bmRcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVW53cmFwIGltYWdlIGZyb20gbm9zY3JpcHRcbiAgICB0aGlzLl91bndyYXBOb3NjcmlwdEltYWdlcyh0aGlzLl9kb2MpO1xuXG4gICAgLy8gRXh0cmFjdCBKU09OLUxEIG1ldGFkYXRhIGJlZm9yZSByZW1vdmluZyBzY3JpcHRzXG4gICAgdmFyIGpzb25MZCA9IHRoaXMuX2Rpc2FibGVKU09OTEQgPyB7fSA6IHRoaXMuX2dldEpTT05MRCh0aGlzLl9kb2MpO1xuXG4gICAgLy8gUmVtb3ZlIHNjcmlwdCB0YWdzIGZyb20gdGhlIGRvY3VtZW50LlxuICAgIHRoaXMuX3JlbW92ZVNjcmlwdHModGhpcy5fZG9jKTtcblxuICAgIHRoaXMuX3ByZXBEb2N1bWVudCgpO1xuXG4gICAgdmFyIG1ldGFkYXRhID0gdGhpcy5fZ2V0QXJ0aWNsZU1ldGFkYXRhKGpzb25MZCk7XG4gICAgdGhpcy5fYXJ0aWNsZVRpdGxlID0gbWV0YWRhdGEudGl0bGU7XG5cbiAgICB2YXIgYXJ0aWNsZUNvbnRlbnQgPSB0aGlzLl9ncmFiQXJ0aWNsZSgpO1xuICAgIGlmICghYXJ0aWNsZUNvbnRlbnQpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIHRoaXMubG9nKFwiR3JhYmJlZDogXCIgKyBhcnRpY2xlQ29udGVudC5pbm5lckhUTUwpO1xuXG4gICAgdGhpcy5fcG9zdFByb2Nlc3NDb250ZW50KGFydGljbGVDb250ZW50KTtcblxuICAgIC8vIElmIHdlIGhhdmVuJ3QgZm91bmQgYW4gZXhjZXJwdCBpbiB0aGUgYXJ0aWNsZSdzIG1ldGFkYXRhLCB1c2UgdGhlIGFydGljbGUnc1xuICAgIC8vIGZpcnN0IHBhcmFncmFwaCBhcyB0aGUgZXhjZXJwdC4gVGhpcyBpcyB1c2VkIGZvciBkaXNwbGF5aW5nIGEgcHJldmlldyBvZlxuICAgIC8vIHRoZSBhcnRpY2xlJ3MgY29udGVudC5cbiAgICBpZiAoIW1ldGFkYXRhLmV4Y2VycHQpIHtcbiAgICAgIHZhciBwYXJhZ3JhcGhzID0gYXJ0aWNsZUNvbnRlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwXCIpO1xuICAgICAgaWYgKHBhcmFncmFwaHMubGVuZ3RoID4gMCkge1xuICAgICAgICBtZXRhZGF0YS5leGNlcnB0ID0gcGFyYWdyYXBoc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRleHRDb250ZW50ID0gYXJ0aWNsZUNvbnRlbnQudGV4dENvbnRlbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLl9hcnRpY2xlVGl0bGUsXG4gICAgICBieWxpbmU6IG1ldGFkYXRhLmJ5bGluZSB8fCB0aGlzLl9hcnRpY2xlQnlsaW5lLFxuICAgICAgZGlyOiB0aGlzLl9hcnRpY2xlRGlyLFxuICAgICAgbGFuZzogdGhpcy5fYXJ0aWNsZUxhbmcsXG4gICAgICBjb250ZW50OiB0aGlzLl9zZXJpYWxpemVyKGFydGljbGVDb250ZW50KSxcbiAgICAgIHRleHRDb250ZW50OiB0ZXh0Q29udGVudCxcbiAgICAgIGxlbmd0aDogdGV4dENvbnRlbnQubGVuZ3RoLFxuICAgICAgZXhjZXJwdDogbWV0YWRhdGEuZXhjZXJwdCxcbiAgICAgIHNpdGVOYW1lOiBtZXRhZGF0YS5zaXRlTmFtZSB8fCB0aGlzLl9hcnRpY2xlU2l0ZU5hbWUsXG4gICAgICBwdWJsaXNoZWRUaW1lOiBtZXRhZGF0YS5wdWJsaXNoZWRUaW1lXG4gICAgfTtcbiAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgLyogZ2xvYmFsIG1vZHVsZSAqL1xuICBtb2R1bGUuZXhwb3J0cyA9IFJlYWRhYmlsaXR5O1xufVxuIiwgIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAgQXJjOTAgSW5jXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBUaGlzIGNvZGUgaXMgaGVhdmlseSBiYXNlZCBvbiBBcmM5MCdzIHJlYWRhYmlsaXR5LmpzICgxLjcuMSkgc2NyaXB0XG4gKiBhdmFpbGFibGUgYXQ6IGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9hcmM5MGxhYnMtcmVhZGFiaWxpdHlcbiAqL1xuXG52YXIgUkVHRVhQUyA9IHtcbiAgLy8gTk9URTogVGhlc2UgdHdvIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYXJlIGR1cGxpY2F0ZWQgaW5cbiAgLy8gUmVhZGFiaWxpdHkuanMuIFBsZWFzZSBrZWVwIGJvdGggY29waWVzIGluIHN5bmMuXG4gIHVubGlrZWx5Q2FuZGlkYXRlczogLy1hZC18YWkyaHRtbHxiYW5uZXJ8YnJlYWRjcnVtYnN8Y29tYnh8Y29tbWVudHxjb21tdW5pdHl8Y292ZXItd3JhcHxkaXNxdXN8ZXh0cmF8Zm9vdGVyfGdkcHJ8aGVhZGVyfGxlZ2VuZHN8bWVudXxyZWxhdGVkfHJlbWFya3xyZXBsaWVzfHJzc3xzaG91dGJveHxzaWRlYmFyfHNreXNjcmFwZXJ8c29jaWFsfHNwb25zb3J8c3VwcGxlbWVudGFsfGFkLWJyZWFrfGFnZWdhdGV8cGFnaW5hdGlvbnxwYWdlcnxwb3B1cHx5b20tcmVtb3RlL2ksXG4gIG9rTWF5YmVJdHNBQ2FuZGlkYXRlOiAvYW5kfGFydGljbGV8Ym9keXxjb2x1bW58Y29udGVudHxtYWlufHNoYWRvdy9pLFxufTtcblxuZnVuY3Rpb24gaXNOb2RlVmlzaWJsZShub2RlKSB7XG4gIC8vIEhhdmUgdG8gbnVsbC1jaGVjayBub2RlLnN0eWxlIGFuZCBub2RlLmNsYXNzTmFtZS5pbmRleE9mIHRvIGRlYWwgd2l0aCBTVkcgYW5kIE1hdGhNTCBub2Rlcy5cbiAgcmV0dXJuICghbm9kZS5zdHlsZSB8fCBub2RlLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpXG4gICAgJiYgIW5vZGUuaGFzQXR0cmlidXRlKFwiaGlkZGVuXCIpXG4gICAgLy9jaGVjayBmb3IgXCJmYWxsYmFjay1pbWFnZVwiIHNvIHRoYXQgd2lraW1lZGlhIG1hdGggaW1hZ2VzIGFyZSBkaXNwbGF5ZWRcbiAgICAmJiAoIW5vZGUuaGFzQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKSAhPSBcInRydWVcIiB8fCAobm9kZS5jbGFzc05hbWUgJiYgbm9kZS5jbGFzc05hbWUuaW5kZXhPZiAmJiBub2RlLmNsYXNzTmFtZS5pbmRleE9mKFwiZmFsbGJhY2staW1hZ2VcIikgIT09IC0xKSk7XG59XG5cbi8qKlxuICogRGVjaWRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgZG9jdW1lbnQgaXMgcmVhZGVyLWFibGUgd2l0aG91dCBwYXJzaW5nIHRoZSB3aG9sZSB0aGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pbkNvbnRlbnRMZW5ndGg9MTQwXSBUaGUgbWluaW11bSBub2RlIGNvbnRlbnQgbGVuZ3RoIHVzZWQgdG8gZGVjaWRlIGlmIHRoZSBkb2N1bWVudCBpcyByZWFkZXJhYmxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblNjb3JlPTIwXSBUaGUgbWludW11bSBjdW11bGF0ZWQgJ3Njb3JlJyB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZG9jdW1lbnQgaXMgcmVhZGVyYWJsZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2liaWxpdHlDaGVja2VyPWlzTm9kZVZpc2libGVdIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiBhIG5vZGUgaXMgdmlzaWJsZS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHdlIHN1c3BlY3QgUmVhZGFiaWxpdHkucGFyc2UoKSB3aWxsIHN1Y2VlZWQgYXQgcmV0dXJuaW5nIGFuIGFydGljbGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc1Byb2JhYmx5UmVhZGVyYWJsZShkb2MsIG9wdGlvbnMgPSB7fSkge1xuICAvLyBGb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSByZWFzb25zICdvcHRpb25zJyBjYW4gZWl0aGVyIGJlIGEgY29uZmlndXJhdGlvbiBvYmplY3Qgb3IgdGhlIGZ1bmN0aW9uIHVzZWRcbiAgLy8gdG8gZGV0ZXJtaW5lIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb3B0aW9ucyA9IHsgdmlzaWJpbGl0eUNoZWNrZXI6IG9wdGlvbnMgfTtcbiAgfVxuXG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IHsgbWluU2NvcmU6IDIwLCBtaW5Db250ZW50TGVuZ3RoOiAxNDAsIHZpc2liaWxpdHlDaGVja2VyOiBpc05vZGVWaXNpYmxlIH07XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICB2YXIgbm9kZXMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcInAsIHByZSwgYXJ0aWNsZVwiKTtcblxuICAvLyBHZXQgPGRpdj4gbm9kZXMgd2hpY2ggaGF2ZSA8YnI+IG5vZGUocykgYW5kIGFwcGVuZCB0aGVtIGludG8gdGhlIGBub2Rlc2AgdmFyaWFibGUuXG4gIC8vIFNvbWUgYXJ0aWNsZXMnIERPTSBzdHJ1Y3R1cmVzIG1pZ2h0IGxvb2sgbGlrZVxuICAvLyA8ZGl2PlxuICAvLyAgIFNlbnRlbmNlczxicj5cbiAgLy8gICA8YnI+XG4gIC8vICAgU2VudGVuY2VzPGJyPlxuICAvLyA8L2Rpdj5cbiAgdmFyIGJyTm9kZXMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcImRpdiA+IGJyXCIpO1xuICBpZiAoYnJOb2Rlcy5sZW5ndGgpIHtcbiAgICB2YXIgc2V0ID0gbmV3IFNldChub2Rlcyk7XG4gICAgW10uZm9yRWFjaC5jYWxsKGJyTm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBzZXQuYWRkKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgfSk7XG4gICAgbm9kZXMgPSBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICB2YXIgc2NvcmUgPSAwO1xuICAvLyBUaGlzIGlzIGEgbGl0dGxlIGNoZWVreSwgd2UgdXNlIHRoZSBhY2N1bXVsYXRvciAnc2NvcmUnIHRvIGRlY2lkZSB3aGF0IHRvIHJldHVybiBmcm9tXG4gIC8vIHRoaXMgY2FsbGJhY2s6XG4gIHJldHVybiBbXS5zb21lLmNhbGwobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKCFvcHRpb25zLnZpc2liaWxpdHlDaGVja2VyKG5vZGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG1hdGNoU3RyaW5nID0gbm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5vZGUuaWQ7XG4gICAgaWYgKFJFR0VYUFMudW5saWtlbHlDYW5kaWRhdGVzLnRlc3QobWF0Y2hTdHJpbmcpICYmXG4gICAgICAgICFSRUdFWFBTLm9rTWF5YmVJdHNBQ2FuZGlkYXRlLnRlc3QobWF0Y2hTdHJpbmcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubWF0Y2hlcyhcImxpIHBcIikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdGV4dENvbnRlbnRMZW5ndGggPSBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGg7XG4gICAgaWYgKHRleHRDb250ZW50TGVuZ3RoIDwgb3B0aW9ucy5taW5Db250ZW50TGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2NvcmUgKz0gTWF0aC5zcXJ0KHRleHRDb250ZW50TGVuZ3RoIC0gb3B0aW9ucy5taW5Db250ZW50TGVuZ3RoKTtcblxuICAgIGlmIChzY29yZSA+IG9wdGlvbnMubWluU2NvcmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAvKiBnbG9iYWwgbW9kdWxlICovXG4gIG1vZHVsZS5leHBvcnRzID0gaXNQcm9iYWJseVJlYWRlcmFibGU7XG59XG4iLCAiLyogZXNsaW50LWVudiBub2RlICovXG52YXIgUmVhZGFiaWxpdHkgPSByZXF1aXJlKFwiLi9SZWFkYWJpbGl0eVwiKTtcbnZhciBpc1Byb2JhYmx5UmVhZGVyYWJsZSA9IHJlcXVpcmUoXCIuL1JlYWRhYmlsaXR5LXJlYWRlcmFibGVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSZWFkYWJpbGl0eTogUmVhZGFiaWxpdHksXG4gIGlzUHJvYmFibHlSZWFkZXJhYmxlOiBpc1Byb2JhYmx5UmVhZGVyYWJsZVxufTtcbiIsICJpbXBvcnQge1xuICBBcHAsXG4gIE1vZGFsLFxuICBOb3RpY2UsXG4gIFBsdWdpbixcbiAgUGx1Z2luU2V0dGluZ1RhYixcbiAgU2V0dGluZyxcbiAgVEZpbGUsXG4gIG5vcm1hbGl6ZVBhdGgsXG4gIHJlcXVlc3RVcmxcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBSZWFkYWJpbGl0eSB9IGZyb20gXCJAbW96aWxsYS9yZWFkYWJpbGl0eVwiO1xuaW1wb3J0IFR1cm5kb3duU2VydmljZSBmcm9tIFwidHVybmRvd25cIjtcblxuaW50ZXJmYWNlIFB1bHBpdFNldHRpbmdzIHtcbiAgc2F2ZUZvbGRlcjogc3RyaW5nO1xuICBkZWZhdWx0VGFnczogc3RyaW5nO1xuICBmaWxlbmFtZVRlbXBsYXRlOiBzdHJpbmc7XG59XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFB1bHBpdFNldHRpbmdzID0ge1xuICBzYXZlRm9sZGVyOiBcIlB1bHBpdFwiLFxuICBkZWZhdWx0VGFnczogXCJcIixcbiAgZmlsZW5hbWVUZW1wbGF0ZTogXCJ7dGl0bGV9XCJcbn07XG5cbmludGVyZmFjZSBFeHRyYWN0ZWRBcnRpY2xlIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgYnlsaW5lOiBzdHJpbmcgfCBudWxsO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHRleHRDb250ZW50OiBzdHJpbmc7XG4gIGV4Y2VycHQ6IHN0cmluZyB8IG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1bHBpdFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBQdWxwaXRTZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1M7XG5cbiAgYXN5bmMgb25sb2FkKCkge1xuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwic2F2ZS11cmwtZnJvbS1jbGlwYm9hcmRcIixcbiAgICAgIG5hbWU6IFwiU2F2ZSBVUkwgZnJvbSBjbGlwYm9hcmRcIixcbiAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdXJsID0gKGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKSkudHJpbSgpO1xuICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkVXJsKHVybCkpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJDbGlwYm9hcmQgZG9lcyBub3QgY29udGFpbiBhIHZhbGlkIFVSTC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpcFVybCh1cmwpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHVscGl0OiBjbGlwYm9hcmQgcmVhZCBmYWlsZWRcIiwgZXJyKTtcbiAgICAgICAgICBuZXcgTm90aWNlKFwiQ291bGQgbm90IHJlYWQgY2xpcGJvYXJkLiBVc2UgdGhlIG1vZGFsIGNvbW1hbmQgaW5zdGVhZC5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJzYXZlLXVybC1mcm9tLXByb21wdFwiLFxuICAgICAgbmFtZTogXCJTYXZlIFVSTCAocGFzdGUgaW4gZGlhbG9nKVwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgbmV3IFVybFByb21wdE1vZGFsKHRoaXMuYXBwLCBhc3luYyAodXJsKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGlwVXJsKHVybCk7XG4gICAgICAgIH0pLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgUHVscGl0U2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuICB9XG5cbiAgaXNWYWxpZFVybCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXRleHQpIHJldHVybiBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdSA9IG5ldyBVUkwodGV4dCk7XG4gICAgICByZXR1cm4gdS5wcm90b2NvbCA9PT0gXCJodHRwOlwiIHx8IHUucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2xpcFVybCh1cmw6IHN0cmluZykge1xuICAgIGNvbnN0IG5vdGljZSA9IG5ldyBOb3RpY2UoXCJQdWxwaXQ6IGZldGNoaW5nIGFydGljbGUuLi5cIiwgMCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGh0bWwgPSBhd2FpdCB0aGlzLmZldGNoUGFnZSh1cmwpO1xuICAgICAgY29uc3QgYXJ0aWNsZSA9IHRoaXMuZXh0cmFjdEFydGljbGUoaHRtbCwgdXJsKTtcbiAgICAgIGlmICghYXJ0aWNsZSkge1xuICAgICAgICBub3RpY2UuaGlkZSgpO1xuICAgICAgICBuZXcgTm90aWNlKFwiQ291bGQgbm90IGV4dHJhY3QgcmVhZGFibGUgY29udGVudCBmcm9tIHRoaXMgcGFnZS5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1hcmtkb3duID0gdGhpcy5odG1sVG9NYXJrZG93bihhcnRpY2xlLmNvbnRlbnQpO1xuICAgICAgY29uc3Qgbm90ZSA9IHRoaXMuY29tcG9zZU5vdGUoYXJ0aWNsZSwgbWFya2Rvd24sIHVybCk7XG4gICAgICBjb25zdCBmaWxlID0gYXdhaXQgdGhpcy53cml0ZU5vdGUoYXJ0aWNsZS50aXRsZSwgbm90ZSk7XG4gICAgICBub3RpY2UuaGlkZSgpO1xuICAgICAgbmV3IE5vdGljZShgU2F2ZWQ6ICR7ZmlsZS5wYXRofWApO1xuICAgICAgYXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChmaWxlLnBhdGgsIFwiXCIsIGZhbHNlKTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIG5vdGljZS5oaWRlKCk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnIpO1xuICAgICAgY29uc29sZS5lcnJvcihcIlB1bHBpdCBlcnJvcjpcIiwgZXJyKTtcbiAgICAgIG5ldyBOb3RpY2UoYFB1bHBpdCBlcnJvcjogJHttZXNzYWdlfWApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZldGNoUGFnZSh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsLCBtZXRob2Q6IFwiR0VUXCIgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA8IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9IGZyb20gJHt1cmx9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZS50ZXh0O1xuICB9XG5cbiAgZXh0cmFjdEFydGljbGUoaHRtbDogc3RyaW5nLCBiYXNlVXJsOiBzdHJpbmcpOiBFeHRyYWN0ZWRBcnRpY2xlIHwgbnVsbCB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG5cbiAgICBjb25zdCBiYXNlID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJiYXNlXCIpO1xuICAgIGJhc2UuaHJlZiA9IGJhc2VVcmw7XG4gICAgaWYgKGRvYy5oZWFkKSB7XG4gICAgICBkb2MuaGVhZC5pbnNlcnRCZWZvcmUoYmFzZSwgZG9jLmhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IFJlYWRhYmlsaXR5KGRvYyk7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVhZGVyLnBhcnNlKCk7XG4gICAgaWYgKCFyZXN1bHQgfHwgIXJlc3VsdC5jb250ZW50KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHJlc3VsdC50aXRsZSB8fCBcIlVudGl0bGVkXCIsXG4gICAgICBieWxpbmU6IHJlc3VsdC5ieWxpbmUsXG4gICAgICBjb250ZW50OiByZXN1bHQuY29udGVudCxcbiAgICAgIHRleHRDb250ZW50OiByZXN1bHQudGV4dENvbnRlbnQgfHwgXCJcIixcbiAgICAgIGV4Y2VycHQ6IHJlc3VsdC5leGNlcnB0XG4gICAgfTtcbiAgfVxuXG4gIGh0bWxUb01hcmtkb3duKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdHVybmRvd24gPSBuZXcgVHVybmRvd25TZXJ2aWNlKHtcbiAgICAgIGhlYWRpbmdTdHlsZTogXCJhdHhcIixcbiAgICAgIGNvZGVCbG9ja1N0eWxlOiBcImZlbmNlZFwiLFxuICAgICAgYnVsbGV0TGlzdE1hcmtlcjogXCItXCIsXG4gICAgICBlbURlbGltaXRlcjogXCIqXCJcbiAgICB9KTtcbiAgICB0dXJuZG93bi5hZGRSdWxlKFwic3RyaWtldGhyb3VnaFwiLCB7XG4gICAgICBmaWx0ZXI6IFtcImRlbFwiLCBcInNcIl0sXG4gICAgICByZXBsYWNlbWVudDogKGNvbnRlbnQpID0+IGB+fiR7Y29udGVudH1+fmBcbiAgICB9KTtcbiAgICByZXR1cm4gdHVybmRvd24udHVybmRvd24oaHRtbCk7XG4gIH1cblxuICBjb21wb3NlTm90ZShhcnRpY2xlOiBFeHRyYWN0ZWRBcnRpY2xlLCBib2R5OiBzdHJpbmcsIHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGlzb0RhdGUgPSBub3cudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gICAgY29uc3QgdGFncyA9IHRoaXMuc2V0dGluZ3MuZGVmYXVsdFRhZ3MudHJpbSgpO1xuXG4gICAgY29uc3QgZnJvbnRtYXR0ZXI6IHN0cmluZ1tdID0gW1wiLS0tXCJdO1xuICAgIGZyb250bWF0dGVyLnB1c2goYHRpdGxlOiAke3RoaXMueWFtbEVzY2FwZShhcnRpY2xlLnRpdGxlKX1gKTtcbiAgICBmcm9udG1hdHRlci5wdXNoKGBzb3VyY2U6ICR7dXJsfWApO1xuICAgIGlmIChhcnRpY2xlLmJ5bGluZSkge1xuICAgICAgZnJvbnRtYXR0ZXIucHVzaChgYXV0aG9yOiAke3RoaXMueWFtbEVzY2FwZShhcnRpY2xlLmJ5bGluZSl9YCk7XG4gICAgfVxuICAgIGZyb250bWF0dGVyLnB1c2goYGRhdGVfc2F2ZWQ6ICR7aXNvRGF0ZX1gKTtcbiAgICBpZiAodGFncykge1xuICAgICAgZnJvbnRtYXR0ZXIucHVzaChgdGFnczogWyR7dGFncy5zcGxpdChcIixcIikubWFwKHQgPT4gdC50cmltKCkpLmZpbHRlcihCb29sZWFuKS5qb2luKFwiLCBcIil9XWApO1xuICAgIH1cbiAgICBmcm9udG1hdHRlci5wdXNoKFwiLS0tXCIpO1xuICAgIGZyb250bWF0dGVyLnB1c2goXCJcIik7XG4gICAgZnJvbnRtYXR0ZXIucHVzaChgIyAke2FydGljbGUudGl0bGV9YCk7XG4gICAgZnJvbnRtYXR0ZXIucHVzaChcIlwiKTtcbiAgICBpZiAoYXJ0aWNsZS5ieWxpbmUpIHtcbiAgICAgIGZyb250bWF0dGVyLnB1c2goYCpCeSAke2FydGljbGUuYnlsaW5lfSpgKTtcbiAgICAgIGZyb250bWF0dGVyLnB1c2goXCJcIik7XG4gICAgfVxuICAgIGZyb250bWF0dGVyLnB1c2goYFNvdXJjZTogPCR7dXJsfT5gKTtcbiAgICBmcm9udG1hdHRlci5wdXNoKFwiXCIpO1xuICAgIGZyb250bWF0dGVyLnB1c2goXCItLS1cIik7XG4gICAgZnJvbnRtYXR0ZXIucHVzaChcIlwiKTtcbiAgICBmcm9udG1hdHRlci5wdXNoKGJvZHkpO1xuXG4gICAgcmV0dXJuIGZyb250bWF0dGVyLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICB5YW1sRXNjYXBlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKC9bOlxcW1xcXXt9IyYqIXw+J1wiJUBgXFxuXS8udGVzdChzKSkge1xuICAgICAgcmV0dXJuIGBcIiR7cy5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyl9XCJgO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIGFzeW5jIHdyaXRlTm90ZSh0aXRsZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPFRGaWxlPiB7XG4gICAgY29uc3QgZm9sZGVyID0gbm9ybWFsaXplUGF0aCh0aGlzLnNldHRpbmdzLnNhdmVGb2xkZXIudHJpbSgpIHx8IFwiUHVscGl0XCIpO1xuICAgIGlmICghYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5leGlzdHMoZm9sZGVyKSkge1xuICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlRm9sZGVyKGZvbGRlcik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2FmZVRpdGxlID0gdGhpcy5zYW5pdGl6ZUZpbGVuYW1lKHRpdGxlKTtcbiAgICBsZXQgZmlsZW5hbWUgPSBgJHtmb2xkZXJ9LyR7c2FmZVRpdGxlfS5tZGA7XG4gICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgIHdoaWxlIChhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhmaWxlbmFtZSkpIHtcbiAgICAgIGZpbGVuYW1lID0gYCR7Zm9sZGVyfS8ke3NhZmVUaXRsZX0gKCR7Y291bnRlcn0pLm1kYDtcbiAgICAgIGNvdW50ZXIrKztcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlKGZpbGVuYW1lLCBjb250ZW50KTtcbiAgfVxuXG4gIHNhbml0aXplRmlsZW5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmFtZVxuICAgICAgLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58I15bXFxdXS9nLCBcIlwiKVxuICAgICAgLnJlcGxhY2UoL1xccysvZywgXCIgXCIpXG4gICAgICAudHJpbSgpXG4gICAgICAuc2xpY2UoMCwgMTAwKSB8fCBcIlVudGl0bGVkXCI7XG4gIH1cblxuICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgfVxufVxuXG5jbGFzcyBVcmxQcm9tcHRNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgb25TdWJtaXQ6ICh1cmw6IHN0cmluZykgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgb25TdWJtaXQ6ICh1cmw6IHN0cmluZykgPT4gdm9pZCkge1xuICAgIHN1cGVyKGFwcCk7XG4gICAgdGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuICB9XG5cbiAgb25PcGVuKCkge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJTYXZlIFVSTCB3aXRoIFB1bHBpdFwiIH0pO1xuXG4gICAgY29uc3QgaW5wdXQgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XG4gICAgICB0eXBlOiBcInVybFwiLFxuICAgICAgcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbS9hcnRpY2xlXCIsXG4gICAgICBjbHM6IFwicHVscGl0LXVybC1pbnB1dFwiXG4gICAgfSk7XG4gICAgaW5wdXQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICBpbnB1dC5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICBpbnB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEycHhcIjtcblxuICAgIGNvbnN0IGJ1dHRvblJvdyA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6IFwicHVscGl0LWJ1dHRvbi1yb3dcIiB9KTtcbiAgICBidXR0b25Sb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGJ1dHRvblJvdy5zdHlsZS5nYXAgPSBcIjhweFwiO1xuICAgIGJ1dHRvblJvdy5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZmxleC1lbmRcIjtcblxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGJ1dHRvblJvdy5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiQ2FuY2VsXCIgfSk7XG4gICAgY2FuY2VsQnRuLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmNsb3NlKCk7XG5cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBidXR0b25Sb3cuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIlNhdmVcIiwgY2xzOiBcIm1vZC1jdGFcIiB9KTtcbiAgICBjb25zdCBzdWJtaXQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBpbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICBuZXcgTm90aWNlKFwiUGxlYXNlIGVudGVyIGEgVVJMLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdSA9IG5ldyBVUkwodXJsKTtcbiAgICAgICAgaWYgKHUucHJvdG9jb2wgIT09IFwiaHR0cDpcIiAmJiB1LnByb3RvY29sICE9PSBcImh0dHBzOlwiKSB7XG4gICAgICAgICAgbmV3IE5vdGljZShcIlVSTCBtdXN0IHVzZSBodHRwIG9yIGh0dHBzLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBuZXcgTm90aWNlKFwiVGhhdCBkb2Vzbid0IGxvb2sgbGlrZSBhIHZhbGlkIFVSTC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMub25TdWJtaXQodXJsKTtcbiAgICB9O1xuICAgIHN1Ym1pdEJ0bi5vbmNsaWNrID0gc3VibWl0O1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikgc3VibWl0KCk7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IGlucHV0LmZvY3VzKCksIDUwKTtcbiAgfVxuXG4gIG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgfVxufVxuXG5jbGFzcyBQdWxwaXRTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHBsdWdpbjogUHVscGl0UGx1Z2luO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFB1bHBpdFBsdWdpbikge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKSB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlNhdmUgZm9sZGVyXCIpXG4gICAgICAuc2V0RGVzYyhcIkZvbGRlciBpbiB5b3VyIHZhdWx0IHdoZXJlIHNhdmVkIGFydGljbGVzIGFyZSB3cml0dGVuLiBXaWxsIGJlIGNyZWF0ZWQgaWYgaXQgZG9lc24ndCBleGlzdC5cIilcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJQdWxwaXRcIilcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNhdmVGb2xkZXIpXG4gICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zYXZlRm9sZGVyID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJEZWZhdWx0IHRhZ3NcIilcbiAgICAgIC5zZXREZXNjKFwiQ29tbWEtc2VwYXJhdGVkIHRhZ3MgdG8gYWRkIHRvIGV2ZXJ5IHNhdmVkIGFydGljbGUuIExlYXZlIGJsYW5rIGZvciBub25lLlwiKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImNsaXBwZWQsIHJlYWRpbmdcIilcbiAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHRUYWdzKVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdFRhZ3MgPSB2YWx1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSkpO1xuICB9XG59XG4iLCAiZnVuY3Rpb24gZXh0ZW5kKGRlc3RpbmF0aW9uKSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgZGVzdGluYXRpb25ba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb247XG59XG5mdW5jdGlvbiByZXBlYXQoY2hhcmFjdGVyLCBjb3VudCkge1xuICByZXR1cm4gQXJyYXkoY291bnQgKyAxKS5qb2luKGNoYXJhY3Rlcik7XG59XG5mdW5jdGlvbiB0cmltTGVhZGluZ05ld2xpbmVzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXG4qLywgJycpO1xufVxuZnVuY3Rpb24gdHJpbVRyYWlsaW5nTmV3bGluZXMoc3RyaW5nKSB7XG4gIC8vIGF2b2lkIG1hdGNoLWF0LWVuZCByZWdleHAgYm90dGxlbmVjaywgc2VlICMzNzBcbiAgdmFyIGluZGV4RW5kID0gc3RyaW5nLmxlbmd0aDtcbiAgd2hpbGUgKGluZGV4RW5kID4gMCAmJiBzdHJpbmdbaW5kZXhFbmQgLSAxXSA9PT0gJ1xcbicpIGluZGV4RW5kLS07XG4gIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGV4RW5kKTtcbn1cbmZ1bmN0aW9uIHRyaW1OZXdsaW5lcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHRyaW1UcmFpbGluZ05ld2xpbmVzKHRyaW1MZWFkaW5nTmV3bGluZXMoc3RyaW5nKSk7XG59XG52YXIgYmxvY2tFbGVtZW50cyA9IFsnQUREUkVTUycsICdBUlRJQ0xFJywgJ0FTSURFJywgJ0FVRElPJywgJ0JMT0NLUVVPVEUnLCAnQk9EWScsICdDQU5WQVMnLCAnQ0VOVEVSJywgJ0REJywgJ0RJUicsICdESVYnLCAnREwnLCAnRFQnLCAnRklFTERTRVQnLCAnRklHQ0FQVElPTicsICdGSUdVUkUnLCAnRk9PVEVSJywgJ0ZPUk0nLCAnRlJBTUVTRVQnLCAnSDEnLCAnSDInLCAnSDMnLCAnSDQnLCAnSDUnLCAnSDYnLCAnSEVBREVSJywgJ0hHUk9VUCcsICdIUicsICdIVE1MJywgJ0lTSU5ERVgnLCAnTEknLCAnTUFJTicsICdNRU5VJywgJ05BVicsICdOT0ZSQU1FUycsICdOT1NDUklQVCcsICdPTCcsICdPVVRQVVQnLCAnUCcsICdQUkUnLCAnU0VDVElPTicsICdUQUJMRScsICdUQk9EWScsICdURCcsICdURk9PVCcsICdUSCcsICdUSEVBRCcsICdUUicsICdVTCddO1xuZnVuY3Rpb24gaXNCbG9jayhub2RlKSB7XG4gIHJldHVybiBpcyhub2RlLCBibG9ja0VsZW1lbnRzKTtcbn1cbnZhciB2b2lkRWxlbWVudHMgPSBbJ0FSRUEnLCAnQkFTRScsICdCUicsICdDT0wnLCAnQ09NTUFORCcsICdFTUJFRCcsICdIUicsICdJTUcnLCAnSU5QVVQnLCAnS0VZR0VOJywgJ0xJTksnLCAnTUVUQScsICdQQVJBTScsICdTT1VSQ0UnLCAnVFJBQ0snLCAnV0JSJ107XG5mdW5jdGlvbiBpc1ZvaWQobm9kZSkge1xuICByZXR1cm4gaXMobm9kZSwgdm9pZEVsZW1lbnRzKTtcbn1cbmZ1bmN0aW9uIGhhc1ZvaWQobm9kZSkge1xuICByZXR1cm4gaGFzKG5vZGUsIHZvaWRFbGVtZW50cyk7XG59XG52YXIgbWVhbmluZ2Z1bFdoZW5CbGFua0VsZW1lbnRzID0gWydBJywgJ1RBQkxFJywgJ1RIRUFEJywgJ1RCT0RZJywgJ1RGT09UJywgJ1RIJywgJ1REJywgJ0lGUkFNRScsICdTQ1JJUFQnLCAnQVVESU8nLCAnVklERU8nXTtcbmZ1bmN0aW9uIGlzTWVhbmluZ2Z1bFdoZW5CbGFuayhub2RlKSB7XG4gIHJldHVybiBpcyhub2RlLCBtZWFuaW5nZnVsV2hlbkJsYW5rRWxlbWVudHMpO1xufVxuZnVuY3Rpb24gaGFzTWVhbmluZ2Z1bFdoZW5CbGFuayhub2RlKSB7XG4gIHJldHVybiBoYXMobm9kZSwgbWVhbmluZ2Z1bFdoZW5CbGFua0VsZW1lbnRzKTtcbn1cbmZ1bmN0aW9uIGlzKG5vZGUsIHRhZ05hbWVzKSB7XG4gIHJldHVybiB0YWdOYW1lcy5pbmRleE9mKG5vZGUubm9kZU5hbWUpID49IDA7XG59XG5mdW5jdGlvbiBoYXMobm9kZSwgdGFnTmFtZXMpIHtcbiAgcmV0dXJuIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgJiYgdGFnTmFtZXMuc29tZShmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpLmxlbmd0aDtcbiAgfSk7XG59XG52YXIgbWFya2Rvd25Fc2NhcGVzID0gW1svXFxcXC9nLCAnXFxcXFxcXFwnXSwgWy9cXCovZywgJ1xcXFwqJ10sIFsvXi0vZywgJ1xcXFwtJ10sIFsvXlxcKyAvZywgJ1xcXFwrICddLCBbL14oPSspL2csICdcXFxcJDEnXSwgWy9eKCN7MSw2fSkgL2csICdcXFxcJDEgJ10sIFsvYC9nLCAnXFxcXGAnXSwgWy9efn5+L2csICdcXFxcfn5+J10sIFsvXFxbL2csICdcXFxcWyddLCBbL1xcXS9nLCAnXFxcXF0nXSwgWy9ePi9nLCAnXFxcXD4nXSwgWy9fL2csICdcXFxcXyddLCBbL14oXFxkKylcXC4gL2csICckMVxcXFwuICddXTtcbmZ1bmN0aW9uIGVzY2FwZU1hcmtkb3duKHN0cmluZykge1xuICByZXR1cm4gbWFya2Rvd25Fc2NhcGVzLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGVzY2FwZSkge1xuICAgIHJldHVybiBhY2N1bXVsYXRvci5yZXBsYWNlKGVzY2FwZVswXSwgZXNjYXBlWzFdKTtcbiAgfSwgc3RyaW5nKTtcbn1cblxudmFyIHJ1bGVzID0ge307XG5ydWxlcy5wYXJhZ3JhcGggPSB7XG4gIGZpbHRlcjogJ3AnLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5saW5lQnJlYWsgPSB7XG4gIGZpbHRlcjogJ2JyJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuYnIgKyAnXFxuJztcbiAgfVxufTtcbnJ1bGVzLmhlYWRpbmcgPSB7XG4gIGZpbHRlcjogWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNiddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgaExldmVsID0gTnVtYmVyKG5vZGUubm9kZU5hbWUuY2hhckF0KDEpKTtcbiAgICBpZiAob3B0aW9ucy5oZWFkaW5nU3R5bGUgPT09ICdzZXRleHQnICYmIGhMZXZlbCA8IDMpIHtcbiAgICAgIHZhciB1bmRlcmxpbmUgPSByZXBlYXQoaExldmVsID09PSAxID8gJz0nIDogJy0nLCBjb250ZW50Lmxlbmd0aCk7XG4gICAgICByZXR1cm4gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcbicgKyB1bmRlcmxpbmUgKyAnXFxuXFxuJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdcXG5cXG4nICsgcmVwZWF0KCcjJywgaExldmVsKSArICcgJyArIGNvbnRlbnQgKyAnXFxuXFxuJztcbiAgICB9XG4gIH1cbn07XG5ydWxlcy5ibG9ja3F1b3RlID0ge1xuICBmaWx0ZXI6ICdibG9ja3F1b3RlJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgY29udGVudCA9IHRyaW1OZXdsaW5lcyhjb250ZW50KS5yZXBsYWNlKC9eL2dtLCAnPiAnKTtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5saXN0ID0ge1xuICBmaWx0ZXI6IFsndWwnLCAnb2wnXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50Lm5vZGVOYW1lID09PSAnTEknICYmIHBhcmVudC5sYXN0RWxlbWVudENoaWxkID09PSBub2RlKSB7XG4gICAgICByZXR1cm4gJ1xcbicgKyBjb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcblxcbic7XG4gICAgfVxuICB9XG59O1xucnVsZXMubGlzdEl0ZW0gPSB7XG4gIGZpbHRlcjogJ2xpJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYnVsbGV0TGlzdE1hcmtlciArICcgICAnO1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudC5ub2RlTmFtZSA9PT0gJ09MJykge1xuICAgICAgdmFyIHN0YXJ0ID0gcGFyZW50LmdldEF0dHJpYnV0ZSgnc3RhcnQnKTtcbiAgICAgIHZhciBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwocGFyZW50LmNoaWxkcmVuLCBub2RlKTtcbiAgICAgIHByZWZpeCA9IChzdGFydCA/IE51bWJlcihzdGFydCkgKyBpbmRleCA6IGluZGV4ICsgMSkgKyAnLiAgJztcbiAgICB9XG4gICAgdmFyIGlzUGFyYWdyYXBoID0gL1xcbiQvLnRlc3QoY29udGVudCk7XG4gICAgY29udGVudCA9IHRyaW1OZXdsaW5lcyhjb250ZW50KSArIChpc1BhcmFncmFwaCA/ICdcXG4nIDogJycpO1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1xcbi9nbSwgJ1xcbicgKyAnICcucmVwZWF0KHByZWZpeC5sZW5ndGgpKTsgLy8gaW5kZW50XG4gICAgcmV0dXJuIHByZWZpeCArIGNvbnRlbnQgKyAobm9kZS5uZXh0U2libGluZyA/ICdcXG4nIDogJycpO1xuICB9XG59O1xucnVsZXMuaW5kZW50ZWRDb2RlQmxvY2sgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5jb2RlQmxvY2tTdHlsZSA9PT0gJ2luZGVudGVkJyAmJiBub2RlLm5vZGVOYW1lID09PSAnUFJFJyAmJiBub2RlLmZpcnN0Q2hpbGQgJiYgbm9kZS5maXJzdENoaWxkLm5vZGVOYW1lID09PSAnQ09ERSc7XG4gIH0sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiAnXFxuXFxuICAgICcgKyBub2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxuL2csICdcXG4gICAgJykgKyAnXFxuXFxuJztcbiAgfVxufTtcbnJ1bGVzLmZlbmNlZENvZGVCbG9jayA9IHtcbiAgZmlsdGVyOiBmdW5jdGlvbiAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmNvZGVCbG9ja1N0eWxlID09PSAnZmVuY2VkJyAmJiBub2RlLm5vZGVOYW1lID09PSAnUFJFJyAmJiBub2RlLmZpcnN0Q2hpbGQgJiYgbm9kZS5maXJzdENoaWxkLm5vZGVOYW1lID09PSAnQ09ERSc7XG4gIH0sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHZhciBjbGFzc05hbWUgPSBub2RlLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICAgIHZhciBsYW5ndWFnZSA9IChjbGFzc05hbWUubWF0Y2goL2xhbmd1YWdlLShcXFMrKS8pIHx8IFtudWxsLCAnJ10pWzFdO1xuICAgIHZhciBjb2RlID0gbm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgIHZhciBmZW5jZUNoYXIgPSBvcHRpb25zLmZlbmNlLmNoYXJBdCgwKTtcbiAgICB2YXIgZmVuY2VTaXplID0gMztcbiAgICB2YXIgZmVuY2VJbkNvZGVSZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgZmVuY2VDaGFyICsgJ3szLH0nLCAnZ20nKTtcbiAgICB2YXIgbWF0Y2g7XG4gICAgd2hpbGUgKG1hdGNoID0gZmVuY2VJbkNvZGVSZWdleC5leGVjKGNvZGUpKSB7XG4gICAgICBpZiAobWF0Y2hbMF0ubGVuZ3RoID49IGZlbmNlU2l6ZSkge1xuICAgICAgICBmZW5jZVNpemUgPSBtYXRjaFswXS5sZW5ndGggKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZmVuY2UgPSByZXBlYXQoZmVuY2VDaGFyLCBmZW5jZVNpemUpO1xuICAgIHJldHVybiAnXFxuXFxuJyArIGZlbmNlICsgbGFuZ3VhZ2UgKyAnXFxuJyArIGNvZGUucmVwbGFjZSgvXFxuJC8sICcnKSArICdcXG4nICsgZmVuY2UgKyAnXFxuXFxuJztcbiAgfVxufTtcbnJ1bGVzLmhvcml6b250YWxSdWxlID0ge1xuICBmaWx0ZXI6ICdocicsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiAnXFxuXFxuJyArIG9wdGlvbnMuaHIgKyAnXFxuXFxuJztcbiAgfVxufTtcbnJ1bGVzLmlubGluZUxpbmsgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5saW5rU3R5bGUgPT09ICdpbmxpbmVkJyAmJiBub2RlLm5vZGVOYW1lID09PSAnQScgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgfSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgdmFyIGhyZWYgPSBlc2NhcGVMaW5rRGVzdGluYXRpb24obm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgdmFyIHRpdGxlID0gZXNjYXBlTGlua1RpdGxlKGNsZWFuQXR0cmlidXRlKG5vZGUuZ2V0QXR0cmlidXRlKCd0aXRsZScpKSk7XG4gICAgdmFyIHRpdGxlUGFydCA9IHRpdGxlID8gJyBcIicgKyB0aXRsZSArICdcIicgOiAnJztcbiAgICByZXR1cm4gJ1snICsgY29udGVudCArICddKCcgKyBocmVmICsgdGl0bGVQYXJ0ICsgJyknO1xuICB9XG59O1xucnVsZXMucmVmZXJlbmNlTGluayA9IHtcbiAgZmlsdGVyOiBmdW5jdGlvbiAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxpbmtTdHlsZSA9PT0gJ3JlZmVyZW5jZWQnICYmIG5vZGUubm9kZU5hbWUgPT09ICdBJyAmJiBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgaHJlZiA9IGVzY2FwZUxpbmtEZXN0aW5hdGlvbihub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICB2YXIgdGl0bGUgPSBjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSk7XG4gICAgaWYgKHRpdGxlKSB0aXRsZSA9ICcgXCInICsgZXNjYXBlTGlua1RpdGxlKHRpdGxlKSArICdcIic7XG4gICAgdmFyIHJlcGxhY2VtZW50O1xuICAgIHZhciByZWZlcmVuY2U7XG4gICAgc3dpdGNoIChvcHRpb25zLmxpbmtSZWZlcmVuY2VTdHlsZSkge1xuICAgICAgY2FzZSAnY29sbGFwc2VkJzpcbiAgICAgICAgcmVwbGFjZW1lbnQgPSAnWycgKyBjb250ZW50ICsgJ11bXSc7XG4gICAgICAgIHJlZmVyZW5jZSA9ICdbJyArIGNvbnRlbnQgKyAnXTogJyArIGhyZWYgKyB0aXRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaG9ydGN1dCc6XG4gICAgICAgIHJlcGxhY2VtZW50ID0gJ1snICsgY29udGVudCArICddJztcbiAgICAgICAgcmVmZXJlbmNlID0gJ1snICsgY29udGVudCArICddOiAnICsgaHJlZiArIHRpdGxlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciBpZCA9IHRoaXMucmVmZXJlbmNlcy5sZW5ndGggKyAxO1xuICAgICAgICByZXBsYWNlbWVudCA9ICdbJyArIGNvbnRlbnQgKyAnXVsnICsgaWQgKyAnXSc7XG4gICAgICAgIHJlZmVyZW5jZSA9ICdbJyArIGlkICsgJ106ICcgKyBocmVmICsgdGl0bGU7XG4gICAgfVxuICAgIHRoaXMucmVmZXJlbmNlcy5wdXNoKHJlZmVyZW5jZSk7XG4gICAgcmV0dXJuIHJlcGxhY2VtZW50O1xuICB9LFxuICByZWZlcmVuY2VzOiBbXSxcbiAgYXBwZW5kOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciByZWZlcmVuY2VzID0gJyc7XG4gICAgaWYgKHRoaXMucmVmZXJlbmNlcy5sZW5ndGgpIHtcbiAgICAgIHJlZmVyZW5jZXMgPSAnXFxuXFxuJyArIHRoaXMucmVmZXJlbmNlcy5qb2luKCdcXG4nKSArICdcXG5cXG4nO1xuICAgICAgdGhpcy5yZWZlcmVuY2VzID0gW107IC8vIFJlc2V0IHJlZmVyZW5jZXNcbiAgICB9XG4gICAgcmV0dXJuIHJlZmVyZW5jZXM7XG4gIH1cbn07XG5ydWxlcy5lbXBoYXNpcyA9IHtcbiAgZmlsdGVyOiBbJ2VtJywgJ2knXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFjb250ZW50LnRyaW0oKSkgcmV0dXJuICcnO1xuICAgIHJldHVybiBvcHRpb25zLmVtRGVsaW1pdGVyICsgY29udGVudCArIG9wdGlvbnMuZW1EZWxpbWl0ZXI7XG4gIH1cbn07XG5ydWxlcy5zdHJvbmcgPSB7XG4gIGZpbHRlcjogWydzdHJvbmcnLCAnYiddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWNvbnRlbnQudHJpbSgpKSByZXR1cm4gJyc7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3Ryb25nRGVsaW1pdGVyICsgY29udGVudCArIG9wdGlvbnMuc3Ryb25nRGVsaW1pdGVyO1xuICB9XG59O1xucnVsZXMuY29kZSA9IHtcbiAgZmlsdGVyOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBoYXNTaWJsaW5ncyA9IG5vZGUucHJldmlvdXNTaWJsaW5nIHx8IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgdmFyIGlzQ29kZUJsb2NrID0gbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnUFJFJyAmJiAhaGFzU2libGluZ3M7XG4gICAgcmV0dXJuIG5vZGUubm9kZU5hbWUgPT09ICdDT0RFJyAmJiAhaXNDb2RlQmxvY2s7XG4gIH0sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgIGlmICghY29udGVudCkgcmV0dXJuICcnO1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1xccj9cXG58XFxyL2csICcgJyk7XG4gICAgdmFyIGV4dHJhU3BhY2UgPSAvXmB8XiAuKj9bXiBdLiogJHxgJC8udGVzdChjb250ZW50KSA/ICcgJyA6ICcnO1xuICAgIHZhciBkZWxpbWl0ZXIgPSAnYCc7XG4gICAgdmFyIG1hdGNoZXMgPSBjb250ZW50Lm1hdGNoKC9gKy9nbSkgfHwgW107XG4gICAgd2hpbGUgKG1hdGNoZXMuaW5kZXhPZihkZWxpbWl0ZXIpICE9PSAtMSkgZGVsaW1pdGVyID0gZGVsaW1pdGVyICsgJ2AnO1xuICAgIHJldHVybiBkZWxpbWl0ZXIgKyBleHRyYVNwYWNlICsgY29udGVudCArIGV4dHJhU3BhY2UgKyBkZWxpbWl0ZXI7XG4gIH1cbn07XG5ydWxlcy5pbWFnZSA9IHtcbiAgZmlsdGVyOiAnaW1nJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgdmFyIGFsdCA9IGVzY2FwZU1hcmtkb3duKGNsZWFuQXR0cmlidXRlKG5vZGUuZ2V0QXR0cmlidXRlKCdhbHQnKSkpO1xuICAgIHZhciBzcmMgPSBlc2NhcGVMaW5rRGVzdGluYXRpb24obm9kZS5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8ICcnKTtcbiAgICB2YXIgdGl0bGUgPSBjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSk7XG4gICAgdmFyIHRpdGxlUGFydCA9IHRpdGxlID8gJyBcIicgKyBlc2NhcGVMaW5rVGl0bGUodGl0bGUpICsgJ1wiJyA6ICcnO1xuICAgIHJldHVybiBzcmMgPyAnIVsnICsgYWx0ICsgJ10nICsgJygnICsgc3JjICsgdGl0bGVQYXJ0ICsgJyknIDogJyc7XG4gIH1cbn07XG5mdW5jdGlvbiBjbGVhbkF0dHJpYnV0ZShhdHRyaWJ1dGUpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZSA/IGF0dHJpYnV0ZS5yZXBsYWNlKC8oXFxuK1xccyopKy9nLCAnXFxuJykgOiAnJztcbn1cbmZ1bmN0aW9uIGVzY2FwZUxpbmtEZXN0aW5hdGlvbihkZXN0aW5hdGlvbikge1xuICB2YXIgZXNjYXBlZCA9IGRlc3RpbmF0aW9uLnJlcGxhY2UoLyhbPD4oKV0pL2csICdcXFxcJDEnKTtcbiAgcmV0dXJuIGVzY2FwZWQuaW5kZXhPZignICcpID49IDAgPyAnPCcgKyBlc2NhcGVkICsgJz4nIDogZXNjYXBlZDtcbn1cbmZ1bmN0aW9uIGVzY2FwZUxpbmtUaXRsZSh0aXRsZSkge1xuICByZXR1cm4gdGl0bGUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpO1xufVxuXG4vKipcbiAqIE1hbmFnZXMgYSBjb2xsZWN0aW9uIG9mIHJ1bGVzIHVzZWQgdG8gY29udmVydCBIVE1MIHRvIE1hcmtkb3duXG4gKi9cblxuZnVuY3Rpb24gUnVsZXMob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLl9rZWVwID0gW107XG4gIHRoaXMuX3JlbW92ZSA9IFtdO1xuICB0aGlzLmJsYW5rUnVsZSA9IHtcbiAgICByZXBsYWNlbWVudDogb3B0aW9ucy5ibGFua1JlcGxhY2VtZW50XG4gIH07XG4gIHRoaXMua2VlcFJlcGxhY2VtZW50ID0gb3B0aW9ucy5rZWVwUmVwbGFjZW1lbnQ7XG4gIHRoaXMuZGVmYXVsdFJ1bGUgPSB7XG4gICAgcmVwbGFjZW1lbnQ6IG9wdGlvbnMuZGVmYXVsdFJlcGxhY2VtZW50XG4gIH07XG4gIHRoaXMuYXJyYXkgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMucnVsZXMpIHRoaXMuYXJyYXkucHVzaChvcHRpb25zLnJ1bGVzW2tleV0pO1xufVxuUnVsZXMucHJvdG90eXBlID0ge1xuICBhZGQ6IGZ1bmN0aW9uIChrZXksIHJ1bGUpIHtcbiAgICB0aGlzLmFycmF5LnVuc2hpZnQocnVsZSk7XG4gIH0sXG4gIGtlZXA6IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICB0aGlzLl9rZWVwLnVuc2hpZnQoe1xuICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICByZXBsYWNlbWVudDogdGhpcy5rZWVwUmVwbGFjZW1lbnRcbiAgICB9KTtcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlLnVuc2hpZnQoe1xuICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICByZXBsYWNlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGZvck5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUuaXNCbGFuaykgcmV0dXJuIHRoaXMuYmxhbmtSdWxlO1xuICAgIHZhciBydWxlO1xuICAgIGlmIChydWxlID0gZmluZFJ1bGUodGhpcy5hcnJheSwgbm9kZSwgdGhpcy5vcHRpb25zKSkgcmV0dXJuIHJ1bGU7XG4gICAgaWYgKHJ1bGUgPSBmaW5kUnVsZSh0aGlzLl9rZWVwLCBub2RlLCB0aGlzLm9wdGlvbnMpKSByZXR1cm4gcnVsZTtcbiAgICBpZiAocnVsZSA9IGZpbmRSdWxlKHRoaXMuX3JlbW92ZSwgbm9kZSwgdGhpcy5vcHRpb25zKSkgcmV0dXJuIHJ1bGU7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJ1bGU7XG4gIH0sXG4gIGZvckVhY2g6IGZ1bmN0aW9uIChmbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hcnJheS5sZW5ndGg7IGkrKykgZm4odGhpcy5hcnJheVtpXSwgaSk7XG4gIH1cbn07XG5mdW5jdGlvbiBmaW5kUnVsZShydWxlcywgbm9kZSwgb3B0aW9ucykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJ1bGUgPSBydWxlc1tpXTtcbiAgICBpZiAoZmlsdGVyVmFsdWUocnVsZSwgbm9kZSwgb3B0aW9ucykpIHJldHVybiBydWxlO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBmaWx0ZXJWYWx1ZShydWxlLCBub2RlLCBvcHRpb25zKSB7XG4gIHZhciBmaWx0ZXIgPSBydWxlLmZpbHRlcjtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGZpbHRlciA9PT0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcikpIHtcbiAgICBpZiAoZmlsdGVyLmluZGV4T2Yobm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA+IC0xKSByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZpbHRlci5jYWxsKHJ1bGUsIG5vZGUsIG9wdGlvbnMpKSByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgZmlsdGVyYCBuZWVkcyB0byBiZSBhIHN0cmluZywgYXJyYXksIG9yIGZ1bmN0aW9uJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgY29sbGFwc2VXaGl0ZXNwYWNlIGZ1bmN0aW9uIGlzIGFkYXB0ZWQgZnJvbSBjb2xsYXBzZS13aGl0ZXNwYWNlXG4gKiBieSBMdWMgVGhldmVuYXJkLlxuICpcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBMdWMgVGhldmVuYXJkIDxsdWN0aGV2ZW5hcmRAZ21haWwuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBjb2xsYXBzZVdoaXRlc3BhY2Uob3B0aW9ucykgcmVtb3ZlcyBleHRyYW5lb3VzIHdoaXRlc3BhY2UgZnJvbSBhbiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBjb2xsYXBzZVdoaXRlc3BhY2Uob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcbiAgdmFyIGlzQmxvY2sgPSBvcHRpb25zLmlzQmxvY2s7XG4gIHZhciBpc1ZvaWQgPSBvcHRpb25zLmlzVm9pZDtcbiAgdmFyIGlzUHJlID0gb3B0aW9ucy5pc1ByZSB8fCBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnUFJFJztcbiAgfTtcbiAgaWYgKCFlbGVtZW50LmZpcnN0Q2hpbGQgfHwgaXNQcmUoZWxlbWVudCkpIHJldHVybjtcbiAgdmFyIHByZXZUZXh0ID0gbnVsbDtcbiAgdmFyIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgdmFyIHByZXYgPSBudWxsO1xuICB2YXIgbm9kZSA9IG5leHQocHJldiwgZWxlbWVudCwgaXNQcmUpO1xuICB3aGlsZSAobm9kZSAhPT0gZWxlbWVudCkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzIHx8IG5vZGUubm9kZVR5cGUgPT09IDQpIHtcbiAgICAgIC8vIE5vZGUuVEVYVF9OT0RFIG9yIE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFXG4gICAgICB2YXIgdGV4dCA9IG5vZGUuZGF0YS5yZXBsYWNlKC9bIFxcclxcblxcdF0rL2csICcgJyk7XG4gICAgICBpZiAoKCFwcmV2VGV4dCB8fCAvICQvLnRlc3QocHJldlRleHQuZGF0YSkpICYmICFrZWVwTGVhZGluZ1dzICYmIHRleHRbMF0gPT09ICcgJykge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGB0ZXh0YCBtaWdodCBiZSBlbXB0eSBhdCB0aGlzIHBvaW50LlxuICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIG5vZGUgPSByZW1vdmUobm9kZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbm9kZS5kYXRhID0gdGV4dDtcbiAgICAgIHByZXZUZXh0ID0gbm9kZTtcbiAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIC8vIE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgICBpZiAoaXNCbG9jayhub2RlKSB8fCBub2RlLm5vZGVOYW1lID09PSAnQlInKSB7XG4gICAgICAgIGlmIChwcmV2VGV4dCkge1xuICAgICAgICAgIHByZXZUZXh0LmRhdGEgPSBwcmV2VGV4dC5kYXRhLnJlcGxhY2UoLyAkLywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHByZXZUZXh0ID0gbnVsbDtcbiAgICAgICAga2VlcExlYWRpbmdXcyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChpc1ZvaWQobm9kZSkgfHwgaXNQcmUobm9kZSkpIHtcbiAgICAgICAgLy8gQXZvaWQgdHJpbW1pbmcgc3BhY2UgYXJvdW5kIG5vbi1ibG9jaywgbm9uLUJSIHZvaWQgZWxlbWVudHMgYW5kIGlubGluZSBQUkUuXG4gICAgICAgIHByZXZUZXh0ID0gbnVsbDtcbiAgICAgICAga2VlcExlYWRpbmdXcyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHByZXZUZXh0KSB7XG4gICAgICAgIC8vIERyb3AgcHJvdGVjdGlvbiBpZiBzZXQgcHJldmlvdXNseS5cbiAgICAgICAga2VlcExlYWRpbmdXcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gcmVtb3ZlKG5vZGUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBuZXh0Tm9kZSA9IG5leHQocHJldiwgbm9kZSwgaXNQcmUpO1xuICAgIHByZXYgPSBub2RlO1xuICAgIG5vZGUgPSBuZXh0Tm9kZTtcbiAgfVxuICBpZiAocHJldlRleHQpIHtcbiAgICBwcmV2VGV4dC5kYXRhID0gcHJldlRleHQuZGF0YS5yZXBsYWNlKC8gJC8sICcnKTtcbiAgICBpZiAoIXByZXZUZXh0LmRhdGEpIHtcbiAgICAgIHJlbW92ZShwcmV2VGV4dCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogcmVtb3ZlKG5vZGUpIHJlbW92ZXMgdGhlIGdpdmVuIG5vZGUgZnJvbSB0aGUgRE9NIGFuZCByZXR1cm5zIHRoZVxuICogbmV4dCBub2RlIGluIHRoZSBzZXF1ZW5jZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqIEByZXR1cm4ge05vZGV9IG5vZGVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcbiAgdmFyIG5leHQgPSBub2RlLm5leHRTaWJsaW5nIHx8IG5vZGUucGFyZW50Tm9kZTtcbiAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICByZXR1cm4gbmV4dDtcbn1cblxuLyoqXG4gKiBuZXh0KHByZXYsIGN1cnJlbnQsIGlzUHJlKSByZXR1cm5zIHRoZSBuZXh0IG5vZGUgaW4gdGhlIHNlcXVlbmNlLCBnaXZlbiB0aGVcbiAqIGN1cnJlbnQgYW5kIHByZXZpb3VzIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gcHJldlxuICogQHBhcmFtIHtOb2RlfSBjdXJyZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpc1ByZVxuICogQHJldHVybiB7Tm9kZX1cbiAqL1xuZnVuY3Rpb24gbmV4dChwcmV2LCBjdXJyZW50LCBpc1ByZSkge1xuICBpZiAocHJldiAmJiBwcmV2LnBhcmVudE5vZGUgPT09IGN1cnJlbnQgfHwgaXNQcmUoY3VycmVudCkpIHtcbiAgICByZXR1cm4gY3VycmVudC5uZXh0U2libGluZyB8fCBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnQuZmlyc3RDaGlsZCB8fCBjdXJyZW50Lm5leHRTaWJsaW5nIHx8IGN1cnJlbnQucGFyZW50Tm9kZTtcbn1cblxuLypcbiAqIFNldCB1cCB3aW5kb3cgZm9yIE5vZGUuanNcbiAqL1xuXG52YXIgcm9vdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge307XG5cbi8qXG4gKiBQYXJzaW5nIEhUTUwgc3RyaW5nc1xuICovXG5cbmZ1bmN0aW9uIGNhblBhcnNlSFRNTE5hdGl2ZWx5KCkge1xuICB2YXIgUGFyc2VyID0gcm9vdC5ET01QYXJzZXI7XG4gIHZhciBjYW5QYXJzZSA9IGZhbHNlO1xuXG4gIC8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS8xMTI5MDMxXG4gIC8vIEZpcmVmb3gvT3BlcmEvSUUgdGhyb3cgZXJyb3JzIG9uIHVuc3VwcG9ydGVkIHR5cGVzXG4gIHRyeSB7XG4gICAgLy8gV2ViS2l0IHJldHVybnMgbnVsbCBvbiB1bnN1cHBvcnRlZCB0eXBlc1xuICAgIGlmIChuZXcgUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKCcnLCAndGV4dC9odG1sJykpIHtcbiAgICAgIGNhblBhcnNlID0gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG4gIHJldHVybiBjYW5QYXJzZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUhUTUxQYXJzZXIoKSB7XG4gIHZhciBQYXJzZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAge1xuICAgIGlmIChzaG91bGRVc2VBY3RpdmVYKCkpIHtcbiAgICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGcm9tU3RyaW5nID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICB2YXIgZG9jID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICAgICAgICBkb2MuZGVzaWduTW9kZSA9ICdvbic7IC8vIGRpc2FibGUgb24tcGFnZSBzY3JpcHRzXG4gICAgICAgIGRvYy5vcGVuKCk7XG4gICAgICAgIGRvYy53cml0ZShzdHJpbmcpO1xuICAgICAgICBkb2MuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VGcm9tU3RyaW5nID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICB2YXIgZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcbiAgICAgICAgZG9jLm9wZW4oKTtcbiAgICAgICAgZG9jLndyaXRlKHN0cmluZyk7XG4gICAgICAgIGRvYy5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gZG9jO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFBhcnNlcjtcbn1cbmZ1bmN0aW9uIHNob3VsZFVzZUFjdGl2ZVgoKSB7XG4gIHZhciB1c2VBY3RpdmVYID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKS5vcGVuKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocm9vdC5BY3RpdmVYT2JqZWN0KSB1c2VBY3RpdmVYID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdXNlQWN0aXZlWDtcbn1cbnZhciBIVE1MUGFyc2VyID0gY2FuUGFyc2VIVE1MTmF0aXZlbHkoKSA/IHJvb3QuRE9NUGFyc2VyIDogY3JlYXRlSFRNTFBhcnNlcigpO1xuXG5mdW5jdGlvbiBSb290Tm9kZShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgcm9vdDtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgZG9jID0gaHRtbFBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhcbiAgICAvLyBET00gcGFyc2VycyBhcnJhbmdlIGVsZW1lbnRzIGluIHRoZSA8aGVhZD4gYW5kIDxib2R5Pi5cbiAgICAvLyBXcmFwcGluZyBpbiBhIGN1c3RvbSBlbGVtZW50IGVuc3VyZXMgZWxlbWVudHMgYXJlIHJlbGlhYmx5IGFycmFuZ2VkIGluXG4gICAgLy8gYSBzaW5nbGUgZWxlbWVudC5cbiAgICAnPHgtdHVybmRvd24gaWQ9XCJ0dXJuZG93bi1yb290XCI+JyArIGlucHV0ICsgJzwveC10dXJuZG93bj4nLCAndGV4dC9odG1sJyk7XG4gICAgcm9vdCA9IGRvYy5nZXRFbGVtZW50QnlJZCgndHVybmRvd24tcm9vdCcpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QgPSBpbnB1dC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbiAgY29sbGFwc2VXaGl0ZXNwYWNlKHtcbiAgICBlbGVtZW50OiByb290LFxuICAgIGlzQmxvY2s6IGlzQmxvY2ssXG4gICAgaXNWb2lkOiBpc1ZvaWQsXG4gICAgaXNQcmU6IG9wdGlvbnMucHJlZm9ybWF0dGVkQ29kZSA/IGlzUHJlT3JDb2RlIDogbnVsbFxuICB9KTtcbiAgcmV0dXJuIHJvb3Q7XG59XG52YXIgX2h0bWxQYXJzZXI7XG5mdW5jdGlvbiBodG1sUGFyc2VyKCkge1xuICBfaHRtbFBhcnNlciA9IF9odG1sUGFyc2VyIHx8IG5ldyBIVE1MUGFyc2VyKCk7XG4gIHJldHVybiBfaHRtbFBhcnNlcjtcbn1cbmZ1bmN0aW9uIGlzUHJlT3JDb2RlKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUubm9kZU5hbWUgPT09ICdQUkUnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdDT0RFJztcbn1cblxuZnVuY3Rpb24gTm9kZShub2RlLCBvcHRpb25zKSB7XG4gIG5vZGUuaXNCbG9jayA9IGlzQmxvY2sobm9kZSk7XG4gIG5vZGUuaXNDb2RlID0gbm9kZS5ub2RlTmFtZSA9PT0gJ0NPREUnIHx8IG5vZGUucGFyZW50Tm9kZS5pc0NvZGU7XG4gIG5vZGUuaXNCbGFuayA9IGlzQmxhbmsobm9kZSk7XG4gIG5vZGUuZmxhbmtpbmdXaGl0ZXNwYWNlID0gZmxhbmtpbmdXaGl0ZXNwYWNlKG5vZGUsIG9wdGlvbnMpO1xuICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGlzQmxhbmsobm9kZSkge1xuICByZXR1cm4gIWlzVm9pZChub2RlKSAmJiAhaXNNZWFuaW5nZnVsV2hlbkJsYW5rKG5vZGUpICYmIC9eXFxzKiQvaS50ZXN0KG5vZGUudGV4dENvbnRlbnQpICYmICFoYXNWb2lkKG5vZGUpICYmICFoYXNNZWFuaW5nZnVsV2hlbkJsYW5rKG5vZGUpO1xufVxuZnVuY3Rpb24gZmxhbmtpbmdXaGl0ZXNwYWNlKG5vZGUsIG9wdGlvbnMpIHtcbiAgaWYgKG5vZGUuaXNCbG9jayB8fCBvcHRpb25zLnByZWZvcm1hdHRlZENvZGUgJiYgbm9kZS5pc0NvZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGVhZGluZzogJycsXG4gICAgICB0cmFpbGluZzogJydcbiAgICB9O1xuICB9XG4gIHZhciBlZGdlcyA9IGVkZ2VXaGl0ZXNwYWNlKG5vZGUudGV4dENvbnRlbnQpO1xuXG4gIC8vIGFiYW5kb24gbGVhZGluZyBBU0NJSSBXUyBpZiBsZWZ0LWZsYW5rZWQgYnkgQVNDSUkgV1NcbiAgaWYgKGVkZ2VzLmxlYWRpbmdBc2NpaSAmJiBpc0ZsYW5rZWRCeVdoaXRlc3BhY2UoJ2xlZnQnLCBub2RlLCBvcHRpb25zKSkge1xuICAgIGVkZ2VzLmxlYWRpbmcgPSBlZGdlcy5sZWFkaW5nTm9uQXNjaWk7XG4gIH1cblxuICAvLyBhYmFuZG9uIHRyYWlsaW5nIEFTQ0lJIFdTIGlmIHJpZ2h0LWZsYW5rZWQgYnkgQVNDSUkgV1NcbiAgaWYgKGVkZ2VzLnRyYWlsaW5nQXNjaWkgJiYgaXNGbGFua2VkQnlXaGl0ZXNwYWNlKCdyaWdodCcsIG5vZGUsIG9wdGlvbnMpKSB7XG4gICAgZWRnZXMudHJhaWxpbmcgPSBlZGdlcy50cmFpbGluZ05vbkFzY2lpO1xuICB9XG4gIHJldHVybiB7XG4gICAgbGVhZGluZzogZWRnZXMubGVhZGluZyxcbiAgICB0cmFpbGluZzogZWRnZXMudHJhaWxpbmdcbiAgfTtcbn1cbmZ1bmN0aW9uIGVkZ2VXaGl0ZXNwYWNlKHN0cmluZykge1xuICB2YXIgbSA9IHN0cmluZy5tYXRjaCgvXigoWyBcXHRcXHJcXG5dKikoXFxzKikpKD86KD89XFxTKVtcXHNcXFNdKlxcUyk/KChcXHMqPykoWyBcXHRcXHJcXG5dKikpJC8pO1xuICByZXR1cm4ge1xuICAgIGxlYWRpbmc6IG1bMV0sXG4gICAgLy8gd2hvbGUgc3RyaW5nIGZvciB3aGl0ZXNwYWNlLW9ubHkgc3RyaW5nc1xuICAgIGxlYWRpbmdBc2NpaTogbVsyXSxcbiAgICBsZWFkaW5nTm9uQXNjaWk6IG1bM10sXG4gICAgdHJhaWxpbmc6IG1bNF0sXG4gICAgLy8gZW1wdHkgZm9yIHdoaXRlc3BhY2Utb25seSBzdHJpbmdzXG4gICAgdHJhaWxpbmdOb25Bc2NpaTogbVs1XSxcbiAgICB0cmFpbGluZ0FzY2lpOiBtWzZdXG4gIH07XG59XG5mdW5jdGlvbiBpc0ZsYW5rZWRCeVdoaXRlc3BhY2Uoc2lkZSwgbm9kZSwgb3B0aW9ucykge1xuICB2YXIgc2libGluZztcbiAgdmFyIHJlZ0V4cDtcbiAgdmFyIGlzRmxhbmtlZDtcbiAgaWYgKHNpZGUgPT09ICdsZWZ0Jykge1xuICAgIHNpYmxpbmcgPSBub2RlLnByZXZpb3VzU2libGluZztcbiAgICByZWdFeHAgPSAvICQvO1xuICB9IGVsc2Uge1xuICAgIHNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIHJlZ0V4cCA9IC9eIC87XG4gIH1cbiAgaWYgKHNpYmxpbmcpIHtcbiAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgaXNGbGFua2VkID0gcmVnRXhwLnRlc3Qoc2libGluZy5ub2RlVmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wcmVmb3JtYXR0ZWRDb2RlICYmIHNpYmxpbmcubm9kZU5hbWUgPT09ICdDT0RFJykge1xuICAgICAgaXNGbGFua2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSAxICYmICFpc0Jsb2NrKHNpYmxpbmcpKSB7XG4gICAgICBpc0ZsYW5rZWQgPSByZWdFeHAudGVzdChzaWJsaW5nLnRleHRDb250ZW50KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzRmxhbmtlZDtcbn1cblxudmFyIHJlZHVjZSA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2U7XG5mdW5jdGlvbiBUdXJuZG93blNlcnZpY2Uob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHVybmRvd25TZXJ2aWNlKSkgcmV0dXJuIG5ldyBUdXJuZG93blNlcnZpY2Uob3B0aW9ucyk7XG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBydWxlczogcnVsZXMsXG4gICAgaGVhZGluZ1N0eWxlOiAnc2V0ZXh0JyxcbiAgICBocjogJyogKiAqJyxcbiAgICBidWxsZXRMaXN0TWFya2VyOiAnKicsXG4gICAgY29kZUJsb2NrU3R5bGU6ICdpbmRlbnRlZCcsXG4gICAgZmVuY2U6ICdgYGAnLFxuICAgIGVtRGVsaW1pdGVyOiAnXycsXG4gICAgc3Ryb25nRGVsaW1pdGVyOiAnKionLFxuICAgIGxpbmtTdHlsZTogJ2lubGluZWQnLFxuICAgIGxpbmtSZWZlcmVuY2VTdHlsZTogJ2Z1bGwnLFxuICAgIGJyOiAnICAnLFxuICAgIHByZWZvcm1hdHRlZENvZGU6IGZhbHNlLFxuICAgIGJsYW5rUmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Jsb2NrID8gJ1xcblxcbicgOiAnJztcbiAgICB9LFxuICAgIGtlZXBSZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmlzQmxvY2sgPyAnXFxuXFxuJyArIG5vZGUub3V0ZXJIVE1MICsgJ1xcblxcbicgOiBub2RlLm91dGVySFRNTDtcbiAgICB9LFxuICAgIGRlZmF1bHRSZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmlzQmxvY2sgPyAnXFxuXFxuJyArIGNvbnRlbnQgKyAnXFxuXFxuJyA6IGNvbnRlbnQ7XG4gICAgfVxuICB9O1xuICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgdGhpcy5ydWxlcyA9IG5ldyBSdWxlcyh0aGlzLm9wdGlvbnMpO1xufVxuVHVybmRvd25TZXJ2aWNlLnByb3RvdHlwZSA9IHtcbiAgLyoqXG4gICAqIFRoZSBlbnRyeSBwb2ludCBmb3IgY29udmVydGluZyBhIHN0cmluZyBvciBET00gbm9kZSB0byBNYXJrZG93blxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBpbnB1dCBUaGUgc3RyaW5nIG9yIERPTSBub2RlIHRvIGNvbnZlcnRcbiAgICogQHJldHVybnMgQSBNYXJrZG93biByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5wdXRcbiAgICogQHR5cGUgU3RyaW5nXG4gICAqL1xuXG4gIHR1cm5kb3duOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICBpZiAoIWNhbkNvbnZlcnQoaW5wdXQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGlucHV0ICsgJyBpcyBub3QgYSBzdHJpbmcsIG9yIGFuIGVsZW1lbnQvZG9jdW1lbnQvZnJhZ21lbnQgbm9kZS4nKTtcbiAgICB9XG4gICAgaWYgKGlucHV0ID09PSAnJykgcmV0dXJuICcnO1xuICAgIHZhciBvdXRwdXQgPSBwcm9jZXNzLmNhbGwodGhpcywgbmV3IFJvb3ROb2RlKGlucHV0LCB0aGlzLm9wdGlvbnMpKTtcbiAgICByZXR1cm4gcG9zdFByb2Nlc3MuY2FsbCh0aGlzLCBvdXRwdXQpO1xuICB9LFxuICAvKipcbiAgICogQWRkIG9uZSBvciBtb3JlIHBsdWdpbnNcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufEFycmF5fSBwbHVnaW4gVGhlIHBsdWdpbiBvciBhcnJheSBvZiBwbHVnaW5zIHRvIGFkZFxuICAgKiBAcmV0dXJucyBUaGUgVHVybmRvd24gaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cblxuICB1c2U6IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwbHVnaW4pKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsdWdpbi5sZW5ndGg7IGkrKykgdGhpcy51c2UocGx1Z2luW2ldKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHBsdWdpbih0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGx1Z2luIG11c3QgYmUgYSBGdW5jdGlvbiBvciBhbiBBcnJheSBvZiBGdW5jdGlvbnMnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBBZGRzIGEgcnVsZVxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIHVuaXF1ZSBrZXkgb2YgdGhlIHJ1bGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHJ1bGUgVGhlIHJ1bGVcbiAgICogQHJldHVybnMgVGhlIFR1cm5kb3duIGluc3RhbmNlIGZvciBjaGFpbmluZ1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG5cbiAgYWRkUnVsZTogZnVuY3Rpb24gKGtleSwgcnVsZSkge1xuICAgIHRoaXMucnVsZXMuYWRkKGtleSwgcnVsZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBLZWVwIGEgbm9kZSAoYXMgSFRNTCkgdGhhdCBtYXRjaGVzIHRoZSBmaWx0ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxGdW5jdGlvbn0gZmlsdGVyIFRoZSB1bmlxdWUga2V5IG9mIHRoZSBydWxlXG4gICAqIEByZXR1cm5zIFRoZSBUdXJuZG93biBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIGtlZXA6IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICB0aGlzLnJ1bGVzLmtlZXAoZmlsdGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLyoqXG4gICAqIFJlbW92ZSBhIG5vZGUgdGhhdCBtYXRjaGVzIHRoZSBmaWx0ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxGdW5jdGlvbn0gZmlsdGVyIFRoZSB1bmlxdWUga2V5IG9mIHRoZSBydWxlXG4gICAqIEByZXR1cm5zIFRoZSBUdXJuZG93biBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIHJlbW92ZTogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIHRoaXMucnVsZXMucmVtb3ZlKGZpbHRlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBFc2NhcGVzIE1hcmtkb3duIHN5bnRheFxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBlc2NhcGVcbiAgICogQHJldHVybnMgQSBzdHJpbmcgd2l0aCBNYXJrZG93biBzeW50YXggZXNjYXBlZFxuICAgKiBAdHlwZSBTdHJpbmdcbiAgICovXG5cbiAgZXNjYXBlOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGVzY2FwZU1hcmtkb3duKHN0cmluZyk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVkdWNlcyBhIERPTSBub2RlIGRvd24gdG8gaXRzIE1hcmtkb3duIHN0cmluZyBlcXVpdmFsZW50XG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50Tm9kZSBUaGUgbm9kZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyBBIE1hcmtkb3duIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBub2RlXG4gKiBAdHlwZSBTdHJpbmdcbiAqL1xuXG5mdW5jdGlvbiBwcm9jZXNzKHBhcmVudE5vZGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXR1cm4gcmVkdWNlLmNhbGwocGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBmdW5jdGlvbiAob3V0cHV0LCBub2RlKSB7XG4gICAgbm9kZSA9IG5ldyBOb2RlKG5vZGUsIHNlbGYub3B0aW9ucyk7XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gJyc7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIHJlcGxhY2VtZW50ID0gbm9kZS5pc0NvZGUgPyBub2RlLm5vZGVWYWx1ZSA6IHNlbGYuZXNjYXBlKG5vZGUubm9kZVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnRGb3JOb2RlLmNhbGwoc2VsZiwgbm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBqb2luKG91dHB1dCwgcmVwbGFjZW1lbnQpO1xuICB9LCAnJyk7XG59XG5cbi8qKlxuICogQXBwZW5kcyBzdHJpbmdzIGFzIGVhY2ggcnVsZSByZXF1aXJlcyBhbmQgdHJpbXMgdGhlIG91dHB1dFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvdXRwdXQgVGhlIGNvbnZlcnNpb24gb3V0cHV0XG4gKiBAcmV0dXJucyBBIHRyaW1tZWQgdmVyc2lvbiBvZiB0aGUgb3VwdXRcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIHBvc3RQcm9jZXNzKG91dHB1dCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIGlmICh0eXBlb2YgcnVsZS5hcHBlbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG91dHB1dCA9IGpvaW4ob3V0cHV0LCBydWxlLmFwcGVuZChzZWxmLm9wdGlvbnMpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0LnJlcGxhY2UoL15bXFx0XFxyXFxuXSsvLCAnJykucmVwbGFjZSgvW1xcdFxcclxcblxcc10rJC8sICcnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBlbGVtZW50IG5vZGUgdG8gaXRzIE1hcmtkb3duIGVxdWl2YWxlbnRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRoZSBub2RlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIEEgTWFya2Rvd24gcmVwcmVzZW50YXRpb24gb2YgdGhlIG5vZGVcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIHJlcGxhY2VtZW50Rm9yTm9kZShub2RlKSB7XG4gIHZhciBydWxlID0gdGhpcy5ydWxlcy5mb3JOb2RlKG5vZGUpO1xuICB2YXIgY29udGVudCA9IHByb2Nlc3MuY2FsbCh0aGlzLCBub2RlKTtcbiAgdmFyIHdoaXRlc3BhY2UgPSBub2RlLmZsYW5raW5nV2hpdGVzcGFjZTtcbiAgaWYgKHdoaXRlc3BhY2UubGVhZGluZyB8fCB3aGl0ZXNwYWNlLnRyYWlsaW5nKSBjb250ZW50ID0gY29udGVudC50cmltKCk7XG4gIHJldHVybiB3aGl0ZXNwYWNlLmxlYWRpbmcgKyBydWxlLnJlcGxhY2VtZW50KGNvbnRlbnQsIG5vZGUsIHRoaXMub3B0aW9ucykgKyB3aGl0ZXNwYWNlLnRyYWlsaW5nO1xufVxuXG4vKipcbiAqIEpvaW5zIHJlcGxhY2VtZW50IHRvIHRoZSBjdXJyZW50IG91dHB1dCB3aXRoIGFwcHJvcHJpYXRlIG51bWJlciBvZiBuZXcgbGluZXNcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBjdXJyZW50IGNvbnZlcnNpb24gb3V0cHV0XG4gKiBAcGFyYW0ge1N0cmluZ30gcmVwbGFjZW1lbnQgVGhlIHN0cmluZyB0byBhcHBlbmQgdG8gdGhlIG91dHB1dFxuICogQHJldHVybnMgSm9pbmVkIG91dHB1dFxuICogQHR5cGUgU3RyaW5nXG4gKi9cblxuZnVuY3Rpb24gam9pbihvdXRwdXQsIHJlcGxhY2VtZW50KSB7XG4gIHZhciBzMSA9IHRyaW1UcmFpbGluZ05ld2xpbmVzKG91dHB1dCk7XG4gIHZhciBzMiA9IHRyaW1MZWFkaW5nTmV3bGluZXMocmVwbGFjZW1lbnQpO1xuICB2YXIgbmxzID0gTWF0aC5tYXgob3V0cHV0Lmxlbmd0aCAtIHMxLmxlbmd0aCwgcmVwbGFjZW1lbnQubGVuZ3RoIC0gczIubGVuZ3RoKTtcbiAgdmFyIHNlcGFyYXRvciA9ICdcXG5cXG4nLnN1YnN0cmluZygwLCBubHMpO1xuICByZXR1cm4gczEgKyBzZXBhcmF0b3IgKyBzMjtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gaW5wdXQgY2FuIGJlIGNvbnZlcnRlZFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBpbnB1dCBEZXNjcmliZSB0aGlzIHBhcmFtZXRlclxuICogQHJldHVybnMgRGVzY3JpYmUgd2hhdCBpdCByZXR1cm5zXG4gKiBAdHlwZSBTdHJpbmd8T2JqZWN0fEFycmF5fEJvb2xlYW58TnVtYmVyXG4gKi9cblxuZnVuY3Rpb24gY2FuQ29udmVydChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQgIT0gbnVsbCAmJiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpbnB1dC5ub2RlVHlwZSAmJiAoaW5wdXQubm9kZVR5cGUgPT09IDEgfHwgaW5wdXQubm9kZVR5cGUgPT09IDkgfHwgaW5wdXQubm9kZVR5cGUgPT09IDExKSk7XG59XG5cbmV4cG9ydCB7IFR1cm5kb3duU2VydmljZSBhcyBkZWZhdWx0IH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7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O0FBQUEsUUFDRjtBQUFBLE1BQ0YsUUFBUTtBQUNOLFlBQUksdUJBQU8scUNBQXFDO0FBQ2hEO0FBQUEsTUFDRjtBQUNBLFdBQUssTUFBTTtBQUNYLFdBQUssU0FBUyxHQUFHO0FBQUEsSUFDbkI7QUFDQSxjQUFVLFVBQVU7QUFDcEIsVUFBTSxpQkFBaUIsV0FBVyxDQUFDLE1BQU07QUFDdkMsVUFBSSxFQUFFLFFBQVE7QUFBUyxlQUFPO0FBQUEsSUFDaEMsQ0FBQztBQUVELGVBQVcsTUFBTSxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQUEsRUFDcEM7QUFBQSxFQUVBLFVBQVU7QUFDUixTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3ZCO0FBQ0Y7QUFFQSxJQUFNLG1CQUFOLGNBQStCLGlDQUFpQjtBQUFBLEVBRzlDLFlBQVksS0FBVSxRQUFzQjtBQUMxQyxVQUFNLEtBQUssTUFBTTtBQUNqQixTQUFLLFNBQVM7QUFBQSxFQUNoQjtBQUFBLEVBRUEsVUFBVTtBQUNSLFVBQU0sRUFBRSxZQUFZLElBQUk7QUFDeEIsZ0JBQVksTUFBTTtBQUVsQixRQUFJLHdCQUFRLFdBQVcsRUFDcEIsUUFBUSxhQUFhLEVBQ3JCLFFBQVEsNkZBQTZGLEVBQ3JHLFFBQVEsVUFBUSxLQUNkLGVBQWUsUUFBUSxFQUN2QixTQUFTLEtBQUssT0FBTyxTQUFTLFVBQVUsRUFDeEMsU0FBUyxPQUFPLFVBQVU7QUFDekIsV0FBSyxPQUFPLFNBQVMsYUFBYTtBQUNsQyxZQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsSUFDakMsQ0FBQyxDQUFDO0FBRU4sUUFBSSx3QkFBUSxXQUFXLEVBQ3BCLFFBQVEsY0FBYyxFQUN0QixRQUFRLDJFQUEyRSxFQUNuRixRQUFRLFVBQVEsS0FDZCxlQUFlLGtCQUFrQixFQUNqQyxTQUFTLEtBQUssT0FBTyxTQUFTLFdBQVcsRUFDekMsU0FBUyxPQUFPLFVBQVU7QUFDekIsV0FBSyxPQUFPLFNBQVMsY0FBYztBQUNuQyxZQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsSUFDakMsQ0FBQyxDQUFDO0FBQUEsRUFDUjtBQUNGOyIsCiAgIm5hbWVzIjogWyJtb2R1bGUiLCAiUmVhZGFiaWxpdHkiLCAibmV4dCIsICJhbmNlc3RvcnMiLCAicm9vdCIsICJtb2R1bGUiLCAibW9kdWxlIiwgIlJlYWRhYmlsaXR5IiwgInJ1bGVzIiwgImlzQmxvY2siLCAiaXNWb2lkIiwgIm5vZGUiLCAibmV4dCIsICJyb290Il0KfQo=
