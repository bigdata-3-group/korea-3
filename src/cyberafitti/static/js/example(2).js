
    var any_text = ["__미__1애__ 뒤__진__넘__아__ 이__러__면__ 욕__ 못__잡__겠__지__?"];
    var trigram_weights = [6.5211211e-11,2.0426019e-11,8.6796881e-09,1.6900321e-09,1.2857307e-09
    ,1.8824561e-02,1.3419062e-01,6.7220968e-03,5.9376353e-01,3.6496796e-05
    ,2.4592008e-01,3.2811656e-07,6.9614736e-09,5.3764565e-04,5.9424510e-12
    ,5.9610655e-13,7.1646335e-11,2.5065163e-12,7.4360379e-12,2.6416565e-06
    ,9.0610875e-08,1.3559296e-12,1.7882780e-12,1.9292069e-07,8.0731593e-12
    ,1.1182906e-12,1.3486920e-12,8.4007159e-12,3.1569151e-12,4.1654000e-10
    ,2.7270570e-09,9.9667011e-12,3.1928643e-10,5.2851348e-08,1.7518458e-10
    ,7.9075563e-10,2.8811227e-08,1.4188430e-09,4.8177579e-10,1.0763663e-09
    ,1.4379562e-07,1.8112126e-11,1.8563673e-09,1.2688647e-09,1.3869665e-10
    ,7.6391157e-11,1.5188835e-10,1.3524171e-06,1.1564698e-07,1.9849603e-11];
    
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
        
        
    