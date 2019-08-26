
    var any_text = ["___________조__금__ 모__자__라__지__만__ 착__한__ 친__구__야__"];
    var trigram_weights = [1.01924877e-06,3.19257879e-07,1.44917735e-07,1.85645547e-07
    ,4.78217373e-07,1.14049033e-06,1.88171407e-06,2.36006304e-06
    ,2.55410578e-06,2.58882551e-06,2.57010515e-06,5.08258854e-05
    ,2.67521292e-02,5.77106606e-04,3.15941218e-03,1.75979249e-02
    ,1.25680572e-05,3.99997361e-06,5.08035446e-05,3.01618684e-06
    ,4.54710447e-04,8.33232582e-01,9.50774483e-06,3.59578844e-04
    ,2.82125548e-03,1.05411141e-06,1.92508676e-08,3.03836958e-03
    ,6.00039485e-08,3.35385721e-07,3.56717464e-05,2.33853234e-06
    ,1.34422851e-06,4.59637158e-05,5.95739158e-03,5.65298949e-04
    ,6.78963587e-03,9.33395058e-05,4.76193323e-04,1.10692556e-04
    ,6.28541966e-05,1.50199281e-02,8.19297880e-02,6.50284665e-06
    ,6.45250850e-07,3.42990290e-07,2.58608246e-09,6.09009119e-04
    ,1.52611421e-04,1.12768594e-08];
    
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
        
        
    