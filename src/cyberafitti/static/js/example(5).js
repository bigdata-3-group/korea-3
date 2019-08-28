
        var any_text = ["______________________잘__하__넼__ㅋ__ㅋ__ㅋ__ㅋ__ㅂ__1ㅅ__"];
var trigram_weights = [5.8077194e-06,2.7759829e-06,3.1869079e-06,7.3011133e-06,1.5836991e-05
,2.7129952e-05,3.7564081e-05,4.5610162e-05,5.1085975e-05,5.4299482e-05
,5.5960390e-05,5.6764766e-05,5.7189522e-05,5.7482608e-05,5.7740010e-05
,5.7982696e-05,5.8204638e-05,5.8397240e-05,5.8555954e-05,5.8681846e-05
,5.8779024e-05,5.8852729e-05,1.3560825e-03,1.8501382e-04,2.6852544e-07
,8.2111766e-04,5.4983678e-07,4.7987655e-06,1.8057344e-06,7.3817006e-05
,8.2695260e-05,7.8808120e-04,1.5760061e-05,2.7644909e-03,1.6541577e-05
,3.3539652e-06,1.7233593e-04,4.7102499e-06,1.9770212e-06,4.5072469e-05
,4.2979646e-06,1.8578029e-06,2.7874739e-05,4.6072273e-06,1.8983836e-06
,9.7869009e-01,1.2006236e-02,1.5658301e-03,2.1041169e-04,2.0316965e-04];

    var color = "255,0,0";
    var ngram_length = 9;
    var half_ngram = 3;
    

    var tokens = any_text[0];
    var intensity = new Array(tokens.length);
    var max_intensity = Number.MIN_SAFE_INTEGER;
    var min_intensity = Number.MAX_SAFE_INTEGER;

    for (var i = 0; i < intensity.length; i++) {
        intensity[i] = 0.0;

        for (var j = -half_ngram; j < ngram_length-half_ngram; j++) {
            if (i+j < intensity.length && i+j > -1) {
                intensity[i] += trigram_weights[i + j];
            }
        }
        if (i == 0 || i == intensity.length-1) {
            intensity[i] /= 6.0;
        } else {
            intensity[i] /= 9.0;
        }
        if (intensity[i] > max_intensity) {
            max_intensity = intensity[i];
        }
        if (intensity[i] < min_intensity) {
            min_intensity = intensity[i];
        }
    }
    var denominator = max_intensity - min_intensity;
    for (var i = 0; i < intensity.length; i++) {
        intensity[i] = (intensity[i] - min_intensity) / denominator;
    }
    var heat_text = "<p>";
    var space = "";
    for (var i = 0; i < tokens.length; i++) {
        heat_text += "<span style='background-color:rgba(" + color + "," + intensity[i] + ")'>" + space + tokens[i] + "</span>";
    }
    heat_text = "</p>"
    $('#attention').prepend(heat_text);
    
    
    