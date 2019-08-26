
    var any_text = ["하__하__ 이__ 착__한__ 친__구__는__ 개__뿔__ 개__병__신__새__끼__"];
var trigram_weights = [1.1435853e-09,6.9881509e-08,7.9397472e-10,1.7882783e-08,1.5026563e-08
,2.0626992e-10,4.6609553e-13,4.6699633e-08,7.6124621e-13,2.0244170e-13
,3.4593983e-12,1.1618845e-09,1.9780346e-09,5.4376743e-09,1.1400506e-09
,1.0851029e-08,1.2953627e-09,4.6739773e-10,7.5597882e-07,4.8494149e-07
,3.7812618e-11,3.7579787e-12,1.7586637e-12,6.3126594e-14,1.6285974e-11
,6.6065947e-10,1.2053807e-10,2.8928210e-10,1.8720576e-10,2.7659897e-09
,7.9067011e-09,1.6926593e-04,6.3425320e-04,3.2735555e-04,8.0335418e-09
,3.2411160e-10,1.1437237e-11,4.1142399e-11,7.3072057e-05,2.9191063e-03
,2.8635957e-03,2.3355903e-01,2.5733963e-03,6.7370027e-02,6.7477828e-01
,1.5987748e-06,1.3144880e-08,1.4729505e-02,1.1400269e-07,1.6328759e-09];

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
    
    $('#attention').append(heat_text);
    
    
