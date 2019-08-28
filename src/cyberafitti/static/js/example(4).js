
        var any_text = ["_________________________________________개__노__잼__"];
var trigram_weights = [2.7294667e-05,1.3046348e-05,1.4977582e-05,3.4313205e-05,7.4429387e-05
,1.2750326e-04,1.7654074e-04,2.1435510e-04,2.4008978e-04,2.5519248e-04
,2.6299816e-04,2.6677866e-04,2.6877475e-04,2.7015229e-04,2.7136202e-04
,2.7250231e-04,2.7354565e-04,2.7445055e-04,2.7519671e-04,2.7578825e-04
,2.7624494e-04,2.7659148e-04,2.7685272e-04,2.7704949e-04,2.7719777e-04
,2.7730988e-04,2.7739504e-04,2.7746015e-04,2.7750921e-04,2.7754682e-04
,2.7757540e-04,2.7759749e-04,2.7761390e-04,2.7762636e-04,2.7763564e-04
,2.7764318e-04,2.7764859e-04,2.7765232e-04,2.7765549e-04,2.7765811e-04
,2.7765986e-04,1.1549104e-02,4.2806754e-05,1.5577661e-04,5.8898604e-01
,2.9921421e-01,6.3589960e-02,2.1829363e-03,2.4559909e-02,4.8756965e-06];

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


    