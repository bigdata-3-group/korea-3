
    var any_text = ["__싹__둑__이__는__ 프__로__그__램__이__야__ 빡__다__갤__아__    "];
var trigram_weights = [7.96455540e-11,2.49472179e-11,2.71198332e-05,3.40762973e-08
,4.43711770e-07,5.31010414e-07,6.01030834e-08,5.86082010e-08
,1.95539717e-04,1.23430405e-10,8.01346402e-12,2.77934712e-13
,1.64342203e-11,2.69429062e-11,6.21705409e-10,6.59279067e-08
,7.07132886e-09,7.38393027e-11,6.57767981e-12,3.70421541e-11
,1.50515933e-09,3.27521371e-10,2.63279909e-09,1.07459845e-08
,1.23722033e-09,1.47270460e-11,8.15550925e-12,3.52804541e-08
,1.50683035e-10,7.54816782e-12,1.05813758e-09,3.43381545e-10
,4.75224200e-12,1.11795233e-10,3.67090147e-13,1.66399298e-06
,1.67360250e-02,9.82813716e-01,2.22226052e-04,1.19101351e-08
,2.90186928e-12,1.17607443e-11,3.94459083e-11,2.03561763e-06
,3.73029309e-07,1.31171064e-11,3.60098648e-12,1.00550037e-12
,8.21520640e-13,1.33009641e-12];

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
    };
    heat_text += "</p>";
    $('#attention').append(heat_text);
    
    
