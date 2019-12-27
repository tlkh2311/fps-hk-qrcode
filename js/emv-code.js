function dataObj(id, value) {
    var paddedLength = String(value.length).pad(2);
    return String(id + paddedLength + value);
}

function emvEncode(obj) {
    var payloadFormatIndicator = dataObj("00", "01");
    var pointOfInitiationMethod = dataObj("01", (obj.amount == "") ? "11" : "12");

    var guid = dataObj("00", "hk.com.hkicl");
    var merchantAccountInformationTemplate = "";

    switch (obj.account) {
        case "02":
        case "10":
        case "11":
            merchantAccountInformationTemplate = dataObj("02", obj.fps_id);
            break;
        case "12": // WSD
            merchantAccountInformationTemplate = dataObj("04", obj.email) + dataObj("06", "1");
            break;
        case "03":
            merchantAccountInformationTemplate = dataObj("01", obj.bank_code) + dataObj("03", obj.mobile);
            break;
        case "04":
            merchantAccountInformationTemplate = dataObj("01", obj.bank_code) + dataObj("04", obj.email);
            break;
        case "05":
            merchantAccountInformationTemplate = dataObj("03", obj.mobile);
            break;
        case "06":
            merchantAccountInformationTemplate = dataObj("04", obj.email);
            break;
    }

    var merchantAccountInformation = dataObj("26", guid + merchantAccountInformationTemplate);
    var merchantCategoryCode = dataObj("52", obj.mcc);
    var transactionCurrency = dataObj("53", obj.currency);
    var countryCode = dataObj("58", "HK");
    var merchantName = dataObj("59", "NA");
    var merchantCity = dataObj("60", "HK");
    var transactionAmount = (obj.amount == "") ? "" : dataObj("54", obj.amount);
    var bill_number = (obj.bill_number == "") ? "" : dataObj("01", obj.bill_number);
    var additionalDataTemplate = (bill_number == "") ? "" : dataObj("62", bill_number);

    var msg = ""
    msg += payloadFormatIndicator;
    msg += pointOfInitiationMethod;
    msg += merchantAccountInformation;
    msg += merchantCategoryCode;
    msg += transactionCurrency;
    msg += countryCode;
    msg += merchantName;
    msg += merchantCity;
    msg += transactionAmount;
    msg += additionalDataTemplate;
    msg += "6304";

    return msg;
}