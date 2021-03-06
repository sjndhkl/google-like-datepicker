/// <reference path="datepicker_widget.ts" />
var app_datepicker;
(function (app_datepicker) {
    function init(selectedDate) {
        var today = new Date();
        var dateFormat = "YYYY-MM-DD";
        var dp_widget = datepicker_widget.datepickerInstance({
            container_id: "#datepicker_container",
            container_class: "datepicker"
        });
        dp_widget.addDatePickerMenuItem("Custom", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', 0).format(dateFormat)
            };
        }));
        dp_widget.addDatePickerMenuItem("Today", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', 0).format(dateFormat)
            };
        }), true);
        dp_widget.addDatePickerMenuItem("Yesterday", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', 1).format(dateFormat)
            };
        }));
        dp_widget.addDatePickerMenuItem("This Week (Sun-Today)", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', today.getDay()).format(dateFormat) + "#" + moment().subtract('days', 0).format(dateFormat)
            };
        }));
        dp_widget.addDatePickerMenuItem("This Week (Mon-Today)", new datepicker_widget.Functionality(function () {
            var day = today.getDay() - 1;
            if (today.getDay() < 1) {
                day = today.getDay() + 6;
            }
            return {
                dateFormatted: moment().subtract('days', day).format(dateFormat) + "#" + moment().subtract('days', 0).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("Last 7 days", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', 6).format(dateFormat) + "#" + moment().subtract('days', 0).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("Last Week (Sun-Sat)", new datepicker_widget.Functionality(function () {
            var last_sunday = today.getDay() + 7;
            return {
                dateFormatted: moment().subtract('days', last_sunday).format(dateFormat) + "#" + moment().subtract('days', last_sunday - 6).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("Last Week (Mon-Sun)", new datepicker_widget.Functionality(function () {
            var last_monday = today.getDay() + 6;
            return {
                dateFormatted: moment().subtract('days', last_monday).format(dateFormat) + "#" + moment().subtract('days', last_monday - 6).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("Last Business Week (Mon-Fri)", new datepicker_widget.Functionality(function () {
            var last_monday = today.getDay() + 6;
            return {
                dateFormatted: moment().subtract('days', last_monday).format(dateFormat) + "#" + moment().subtract('days', last_monday - 4).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("Last 14 days", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', 13).format(dateFormat) + "#" + moment().subtract('days', 0).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("This Month", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('months', 0).format("YYYY-MM")
            };
        }));

        dp_widget.addDatePickerMenuItem("Last 30 days", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('days', 29).format(dateFormat) + "#" + moment().subtract('days', 0).format(dateFormat)
            };
        }));

        dp_widget.addDatePickerMenuItem("Last Month", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: moment().subtract('months', 1).format("YYYY-MM")
            };
        }));
        dp_widget.addDatePickerMenuItem("All time", new datepicker_widget.Functionality(function () {
            return {
                dateFormatted: "all"
            };
        }));

        dp_widget.init(selectedDate);
    }
    app_datepicker.init = init;
})(app_datepicker || (app_datepicker = {}));
//# sourceMappingURL=app.js.map
