<?php
    @session_start();

function process_date($date){
    $splitted_date = preg_split("/#/",$date);

    print_r($splitted_date);
}

$pre_selected_date = '';

if(isset($_POST) && count($_POST)>0){

    //set the session and reuse the value
    $date = $_POST['datepicker_date'];
    //save the date into the session
    $_SESSION['date_on_the_picker'] = $date;
    header("Location: index.php");

}

if(isset($_SESSION['date_on_the_picker'])){
    $pre_selected_date = $_SESSION['date_on_the_picker'];
    print "<pre>The date selected is ".$_SESSION['date_on_the_picker']."\n";
    process_date($pre_selected_date);
    print "</pre>";
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Datepicker Widget Like Google</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/redmond/jquery-ui.css" />
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min.js" type="text/javascript"></script>

    <script src="js/datepicker_widget.js" type="text/javascript"></script>
    <script src="js/app.js" type="text/javascript"></script>
    <script type="text/javascript">
        jQuery(function(){
            app_datepicker.init("<?php echo($pre_selected_date) ?>");
        });
    </script>
    <style>
        .ui-widget {
            font-size: 80%;
            font-family: Helvetica Trebuchet MS,Tahoma,Verdana,Arial,sans-serif;
        }

        .ui-datepicker {
            padding: 0;
        }
        #datepicker_date_placeholder{
            min-width: 200px;
            display: inline-block;
            padding-left:10px;
        }
        .datepicker, .datepicker ul{
            margin: 0;
            padding: 0;
        }
        .datepicker_selected{
            background-color: grey !important;
            color: #ffffff;

        }
        .datepicker,.datepicker_menuitem{
            background-color: ghostwhite;
            padding: 5px;
            font-family: Arial,Helvetica;
            border:1px solid gray;
            position: relative;
        }
        .datepicker_menuitem{
            border: 0px;
            cursor: pointer;
            cursor: hand;
        }
        .datepicker_ddown_btn{
            display: inline-block;
            padding: 0 2px 0 2px;
            margin-left: 5px;
            cursor: pointer;
            cursor: hand;
        }
        .datepickerwidget_popup{
            position: absolute;
            top:30px;
            width: 300px;
        }
    </style>

</head>
<body>
   <p>
       The datepicker uses various js libraries such as moment.js / jquery and datepicker js
   </p>

    <h3>Example here</h3>
   <form action="index.php" method="post">
    <span id="datepicker_container">Date Picker here</span>
    <input type="submit" value="Submit the Date" />
   </form>

   <input type="text" name="selected_date" />
</body>
</html>