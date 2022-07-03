//
// Helpers to get the same code over nodejs and a webbrowser
//
// This is to have nodejs and browser code without webpack or other tools.
//
if (typeof exports === 'undefined') {
    var require = function(node_path, browser_name) {
        return this[browser_name]
    }
}
