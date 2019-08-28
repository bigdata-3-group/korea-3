
        var any_text = ["________________________그__냥__ 뒤__져__ 븅__앜__ㅋ__ㅋ__"];
var trigram_weights = [1.0029548e-04,4.7939349e-05,5.5035751e-05,1.2608530e-04,2.7349417e-04
,4.6851640e-04,6.4870628e-04,7.8765710e-04,8.8222034e-04,9.3771628e-04
,9.6639810e-04,9.8028965e-04,9.8762440e-04,9.9268625e-04,9.9713192e-04
,1.0013221e-03,1.0051557e-03,1.0084809e-03,1.0112223e-03,1.0133958e-03
,1.0150741e-03,1.0163473e-03,1.0173079e-03,1.0180308e-03,4.2421840e-02
,1.0738548e-02,6.3197990e-03,7.5991717e-05,4.6893056e-05,1.5488935e-04
,3.7923630e-02,2.3747434e-05,9.8077682e-05,1.8827800e-03,2.5262386e-01
,4.1706515e-03,2.2219524e-02,1.0258443e-01,4.8037615e-01,7.9053518e-04
,2.6000853e-04,1.6143451e-02,3.3728742e-05,1.8595843e-05,8.2471198e-04
,2.6173887e-04,8.1528415e-04,1.4072942e-04,6.0929309e-05,6.3132111e-04];

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
    var heat_text = "";
    var space = "";
    for (var i = 0; i < tokens.length; i++) {
        heat_text += "<span style='background-color:rgba(" + color + "," + intensity[i] + ")'>" + space + tokens[i] + "</span>";
    }

    $('#attention').prepend(heat_text);


    