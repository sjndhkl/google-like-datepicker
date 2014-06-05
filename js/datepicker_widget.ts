/// <reference path="lib/jquery.d.ts" />
module datepicker_widget{

   export interface DateObject{
        dateFormatted: string;
    }

    export interface Runnable{
        run: () => DateObject;
    }

    export class Functionality implements Runnable{


        constructor(public fn: () => DateObject){

        }

        run(){
            if (this.fn){
                return this.fn();
            }
            return {
                dateFormatted: "Default Formatted"
            };
        }

    }

    export class DatePickerMenuItem{

        menuText: string;
        functionality : Runnable;
        active : boolean;
        item_id: string;

        constructor(menuText: string, functionality: Runnable){
            this.menuText = menuText;
            this.functionality = functionality;
            this.active = false;
        }

        getFunctionality(){
            return this.functionality;
        }

        isActive(){
            return this.active;
        }

    }

    export function datepickerInstance(options: any){
        var options = options || {};
        if(!options.container_class){
            options.container_class = "datepicker";
        }
        var datepicker = new DatePicker(options.container_id,options.container_class,options.dateFormat);
        return datepicker;
    }

    export class DatePicker{

        container_id: string;
        dateFormat: string;
        dateManipulator: any;
        container_class: string;
        item_count: number;
        datepicker_items: any;
        popup_id: string;

        constructor(container_id: string,container_class: string, dateFormat: string){
            this.dateFormat = dateFormat;
            this.container_id = container_id;
            this.container_class = container_class;
            this.item_count = 0;
            this.datepicker_items = [];
            this.popup_id = "datepicker_widget_popup";
            jQuery(this.container_id).addClass(this.container_class);
            jQuery(this.container_id).on('click','.datepicker_ddown_btn', (event: JQueryEventObject) => {
                    this.onclickhandler(event);
            } );
        }


        addDatePickerMenuItem(itemText: string,functionality: Runnable,is_active?: boolean){
                var is_active = is_active || false;
                var datepicker_item = new DatePickerMenuItem(itemText,functionality);
                datepicker_item.active = is_active;
                this.datepicker_items.push(datepicker_item);

        }

        init(){
            jQuery(this.container_id).html("<span id=\"datepicker_date_placeholder\"></span><span class='datepicker_ddown_btn'>&#x25BC;</span>")
            jQuery(this.container_id).append("<input type='hidden' name='datepicker_date' value='' />");
            jQuery(this.container_id).append("<div class='datepickerwidget_popup'><ul id='"+this.popup_id+"'></ul></div>");
            jQuery(".datepickerwidget_popup").hide();
            var that = this;
            jQuery.each(this.datepicker_items,function(index,obj){
                var o = <DatePickerMenuItem> obj;
                if(o.isActive()){
                    that.setItemInDatePicker(o);
                    jQuery("#"+o.item_id+" .icon_item").html("&nbsp; &nbsp; &#x2714;");
                }
                that.initMenuItem(o);
                if(o.menuText=="Custom"){
                    that.initJqueryUiDatePickerFields(o);
                }
                that.item_count++;
            });
        }

        initJqueryUiDatePickerFields(item: DatePickerMenuItem){
            jQuery(this.container_id + " #datepicker_date_placeholder").html(item.menuText);
            jQuery("#"+item.item_id).append("&nbsp;<input style='width: 80px;' type='text' name='custom_dp_from' value='' readonly /> &nbsp; <input style='width: 80px;' type='text' name='custom_dp_to' value='' readonly /> <button id='custom_dp_btn'>Ok</button>");
            //var options = {};
            jQuery( "#"+item.item_id +" input[name='custom_dp_from']" ).datepicker({
                dateFormat: "yy-mm-dd",
                onClose: function( selectedDate ) {
                    jQuery( "#"+item.item_id +" input[name='custom_dp_to']" ).datepicker( "option", "minDate", selectedDate );
                }
            });
            jQuery( "#"+item.item_id +" input[name='custom_dp_to']" ).datepicker({
                dateFormat: "yy-mm-dd",
                onClose: function( selectedDate ) {
                    jQuery( "#"+item.item_id +" input[name='custom_dp_from']" ).datepicker( "option", "maxDate", selectedDate );
                }
            });
            var that = this;
            jQuery("#"+item.item_id).on('click',"#custom_dp_btn",function(event){
                //invalidate all items
                jQuery.each(that.datepicker_items,function(index,obj){
                    var o = <DatePickerMenuItem> obj;
                    jQuery("#"+o.item_id+" .icon_item").html("");
                    o.active = false;
                });
                jQuery(that.container_id + " #datepicker_date_placeholder").html(item.menuText);
                jQuery(that.container_id+ " input[name=\"datepicker_date\"]").attr("value",jQuery( "#"+item.item_id +" input[name='custom_dp_from']").val()+"#"+jQuery( "#"+item.item_id +" input[name='custom_dp_to']").val());
                //that.setItemInDatePicker(item);
                jQuery(".datepickerwidget_popup").hide();

                //show date
                jQuery('input[name="selected_date"]').val(jQuery('input[name="datepicker_date"]').val());
            });

        }


        setItemInDatePicker(item: DatePickerMenuItem){
            var dateObject = item.getFunctionality().run();
            jQuery(this.container_id + " #datepicker_date_placeholder").html(item.menuText);
            jQuery(this.container_id+ " input[name=\"datepicker_date\"]").attr("value",dateObject.dateFormatted);
        }

        initMenuItem(item: DatePickerMenuItem){

            var that = this;
            item.item_id = "datepicker_menuitem_"+this.item_count;
            jQuery("#"+this.popup_id).append("<li class='datepicker_menuitem' id='"+item.item_id+"'>"+item.menuText+"<span class='icon_item'></span></li>");
            if(item.menuText!="Custom"){
                jQuery(document).on('click',"#datepicker_menuitem_"+this.item_count,function(event){
                    var dateObject = item.getFunctionality().run();
                    //invalidate all items
                    jQuery.each(that.datepicker_items,function(index,obj){
                        var o = <DatePickerMenuItem> obj;
                        jQuery("#"+o.item_id+" .icon_item").html("");
                        if(o.menuText=="Custom"){
                            jQuery( "#"+o.item_id +" input[name='custom_dp_to']").val('');
                            jQuery( "#"+o.item_id +" input[name='custom_dp_from']").val('');
                        }
                        o.active = false;
                    });
                    item.active = true;
                    jQuery("#"+item.item_id+" .icon_item").html("&nbsp; &nbsp; &#x2714;");
                    that.setItemInDatePicker(item);
                    jQuery(".datepickerwidget_popup").hide();

                    //show date
                    jQuery('input[name="selected_date"]').val(jQuery('input[name="datepicker_date"]').val());

                });
            }

        }

        private onclickhandler(event: JQueryEventObject){

            var popup_class = ".datepickerwidget_popup";
            if(jQuery(popup_class).css("display")=='none'){
                jQuery(popup_class).show();
            }else{
                jQuery(popup_class).hide();
            }

        }

    }


}