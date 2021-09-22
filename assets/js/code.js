hljs.highlightAll();

(function(e) {
  "use strict";
  e(".language-python").each(function() {
    var t = '<div class="bd-clipboard"><button class="btn-clipboard" title="Copy to clipboard">Copy</button></div>';
    e(this).before(t);
    e(".btn-clipboard").tooltip().on("mouseleave", function() {
        e(this).tooltip("hide")
    })
  });
  e(function() {
    var t = new ClipboardJS(".btn-clipboard",{
      target: function(e) {
          return e.parentNode.nextElementSibling
      }
    });
    t.on("success", function(t) {
        e(t.trigger).attr("title", "Copied!").tooltip("_fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("_fixTitle");
        t.clearSelection()
    });
    t.on("error", function(t) {
        var n = /Mac/i.test(navigator.userAgent) ? "⌘" : "Ctrl-";
        var r = "Press " + n + "C to copy";
        e(t.trigger).attr("title", r).tooltip("_fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("_fixTitle")
    });
  // t.destroy();
  })
}
)(jQuery);

SVGInject(document.querySelectorAll('[data-inject-svg]'));
