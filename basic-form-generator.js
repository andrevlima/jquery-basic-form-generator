/**
 * jQuery Basic Form Generator
 * Generates basic forms according with well structured JSON
 * 
 * @author alima
 */
(function ($) {
    var cacheElementsByField = {}

    $.widget("formgenerator.formgenerator", {
        // Default options
        options: {
            structure: {},
            structureOptions: {},
            data: {},
            factories: {
                formWrapper: function (title) {
                    var element = document.createElement("div");
                    element.className = "card card-body bg-light";
                    if (title) {
                        var label = document.createElement("h4");
                        label.innerText = title;
                        element.appendChild(label);
                    }
                    return element;
                },
                main: function (target, data, options) {
                    return this.options.factories.text(element, data);
                },
                text: {
                    build: function (target, data, options) {
                        var container = document.createElement("div");
                        container.className = "form-group";

                        var label = document.createElement("label");
                        label.innerText = target;

                        var element = document.createElement("input");
                        element.className = "form-control";
                        element.setAttribute("type", "text");
                        if (data[target]) {
                            element.value = data[target];
                        }

                        if (options.disable) {
                            $(element).prop("disabled", true);
                        }

                        if (options.placeholder) {
                            $(element).attr("placeholder", options.placeholder);
                        }

                        container.appendChild(label);
                        container.appendChild(element);

                        $(element).on("change", function () {
                            data[target] = $(this).val();
                        });
                        $(element).on("paste keyup", function () {
                            $(element).trigger("change");
                        });

                        return {
                            node: container,
                            element: element
                        }
                    }
                },
                date: {
                    build: function (target, data, options) {
                        var container = document.createElement("div");
                        container.className = "form-group";

                        var label = document.createElement("label");
                        label.innerText = target;

                        var element = document.createElement("input");
                        element.className = "form-control";
                        element.setAttribute("type", "date");
                        if (data[target]) {
                            element.value = data[target];
                        }

                        if (options.disable) {
                            $(element).prop("disabled", true);
                        }

                        if (options.placeholder) {
                            $(element).attr("placeholder", options.placeholder);
                        }

                        container.appendChild(label);
                        container.appendChild(element);

                        $(element).on("change", function () {
                            data[target] = $(this).val();
                        });
                        $(element).on("paste keyup", function () {
                            $(element).trigger("change");
                        });

                        return {
                            node: container,
                            element: element
                        }
                    }
                },
                number: {
                    build: function (target, data, options) {
                        var container = document.createElement("div");
                        container.className = "form-group";

                        var label = document.createElement("label");
                        label.innerText = target;

                        var element = document.createElement("input");
                        element.className = "form-control";
                        element.setAttribute("type", "number");
                        if (data[target]) {
                            element.value = data[target];
                        }

                        if (options.disable) {
                            $(element).prop("disabled", true);
                        }

                        if (options.placeholder) {
                            $(element).attr("placeholder", options.placeholder);
                        }

                        container.appendChild(label);
                        container.appendChild(element);

                        $(element).on("change", function () {
                            data[target] = $(this).val();
                        });
                        $(element).on("paste keyup", function () {
                            $(element).trigger("change");
                        });

                        return {
                            node: container,
                            element: element
                        }
                    },
                    set: function(element, value) {
                        
                    }
                }
            }
        },
        // The constructor
        _create: function () {
            this.element.empty();
            var wrapper = this._buildWrapper();
            this.element.append(wrapper);
            this._buildElements(wrapper, this.options.data, this.options.structure, this.options.structureOptions);
        },
        _buildWrapper: function (title) {
            var factory = this.options.factories["formWrapper"];
            return factory(title);
        },
        _buildElements: function (node, data, structure, structureOptions) {
            var self = this;
            var factories = this.options.factories;
            var allFields = Object.keys(structure);
            var structureOptions = structureOptions || {};

            allFields.forEach(function (name) {
                var structureValue = structure[name];
                var fieldOptions = structureOptions[name] || {};

                if (structureValue instanceof Object) {
                    var factory = factories["formWrapper"];
                    var wrapper = self._buildWrapper(name);
                    node.appendChild(wrapper);
                    data[name] = data[name] || new Object();
                    self._buildElements.call(self, wrapper, data[name], structureValue, fieldOptions);
                } else {
                    var factory = factories[structureValue];
                    if (!factory) {
                        factory = factories["main"];
                    }
                    node.appendChild(factory.build(name, data, fieldOptions).node);
                    data[name] = data[name] || "";
                }
            });
        },
        getData: function () {
            return this.options.data;
        },
        destroy: function() {
            this.element.empty();
        },
        setData: function(data) {

        }
    });

})(jQuery);
