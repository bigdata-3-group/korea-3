
        var any_text = ["_____이__ 호__로__잡__놈__앜__ㅋ__ㅋ__ㅋ__ㅋ__거__길__ 왜__ 가__"];
var trigram_weights = [4.12947202e-06,1.97381178e-06,2.26599263e-06,5.19132300e-06
,1.12606012e-05,3.78718803e-04,2.17687084e-05,6.69537121e-06
,2.04614573e-03,1.53271307e-03,3.94664482e-07,1.07698965e-04
,1.69333941e-06,7.91677303e-06,1.70027079e-07,1.03465727e-05
,5.62807872e-05,1.75169805e-06,1.36592666e-06,9.88069594e-01
,1.88232988e-07,1.28589988e-06,3.40731994e-08,9.16916036e-08
,1.49148300e-05,8.05873333e-06,7.52001215e-05,4.34967842e-06
,2.11901511e-06,4.06596482e-05,3.19619244e-06,1.38858843e-06
,2.51987622e-05,3.22222536e-06,1.33038293e-06,1.88932245e-05
,1.13774440e-03,3.61868646e-04,1.04180499e-05,1.22822379e-03
,7.51552807e-06,8.16196989e-05,9.13254742e-04,9.00517043e-04
,1.92704902e-05,2.32451130e-05,5.44165086e-04,1.77504460e-03
,2.83504733e-06,5.26141550e-04];

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


    