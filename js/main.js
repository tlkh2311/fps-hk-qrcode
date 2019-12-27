(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var account = $('.validate-input :input[name="account"]');
    var bank_code = $('.validate-input :input[name="bank_code"]');
    var fps_id = $('.validate-input :input[name="fps_id"]');
    var mobile = $('.validate-input :input[name="mobile"]');
    var email = $('.validate-input :input[name="email"]');
    var mcc = $('.validate-input :input[name="mcc"]');
    var currency = $('.validate-input :input[name="currency"]');
    var amount = $('.validate-input :input[name="amount"]');
    var message = $('.validate-input :input[name="message"]');
    var bill_number = $('.validate-input :input[name="bill_number"]');
    var hash = $('.validate-input :input[name="hash"]');


    $('.validate-form').on('submit', function () {
        var msg = emvEncode({
            "account": account.val(),
            "bank_code": bank_code.val(),
            "fps_id": fps_id.val(),
            "mobile": mobile.val(),
            "email": email.val(),
            "mcc": mcc.val(),
            "currency": currency.val(),
            "amount": amount.val(),
            "bill_number": bill_number.val()
        });

        var crc = crc16(msg).toString(16).pad(4).toUpperCase();

        $(message).val(msg + crc);
        $(hash).val(crc);
        $("#qrcode").html("");
        new QRCode(document.getElementById("qrcode"), msg + crc);

        return false;
    });

    $('.validate-form :input[name="account"]').change(function () {
        $('.validate-form :input.account').hide();
        switch ($(this).val()) {
            case "02":
                $('.validate-form :input[name="fps_id"]').show();
                break;
            case "03":
                $('.validate-form :input[name="bank_code"]').show();
                $('.validate-form :input[name="mobile"]').show();
                break;
            case "04":
                $('.validate-form :input[name="bank_code"]').show();
                $('.validate-form :input[name="email"]').show();
                break;
            case "05":
                $('.validate-form :input[name="mobile"]').show();
                break;
            case "06":
                $('.validate-form :input[name="email"]').show();
                break;
            case "10": // CLP
                $('.validate-form :input[name="fps_id"]').show();
                $('.validate-form :input[name="fps_id"]').prop('disabled', true);
                $('.validate-form :input[name="fps_id"]').val('4853305');
                break;
            case "11": // Towngas
                $('.validate-form :input[name="fps_id"]').show();
                $('.validate-form :input[name="fps_id"]').prop('disabled', true);
                $('.validate-form :input[name="fps_id"]').val('1187368');
                break;
            case "12": // WSD
                $('.validate-form :input[name="email"]').show();
                $('.validate-form :input[name="email"]').prop('disabled', true);
                $('.validate-form :input[name="email"]').val('wsdinfo@wsd.gov.hk');
                break;
        }
    });

    $('.validate-form .input1').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);