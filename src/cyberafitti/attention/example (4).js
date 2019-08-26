
    var any_text = ["__________착__한__ 척__ 하__는__ 나__의__ 씪__빢__썎__끾__앾__"];
    var trigram_weights = [5.11594456e-12,1.60246024e-12,7.27389665e-13,9.31816039e-13
    ,2.40032993e-12,5.72449553e-12,9.44492314e-12,1.18459097e-11
    ,1.28198962e-11,1.29941656e-11,2.08501535e-10,6.63732491e-09
    ,3.89999595e-11,3.21062310e-09,2.69052891e-09,9.19643195e-10
    ,1.37255499e-10,2.56749956e-07,3.19133960e-07,1.92677610e-10
    ,3.94724170e-10,5.77511639e-09,6.15305418e-10,2.43510789e-09
    ,1.10589697e-11,3.29392451e-11,4.91501327e-12,9.58435414e-11
    ,7.58682093e-12,5.07649534e-10,7.05512732e-11,8.31681007e-07
    ,1.14145455e-11,1.67620640e-11,3.88491669e-11,1.86642204e-08
    ,1.16111626e-11,6.43800169e-09,6.69815223e-13,1.28726692e-08
    ,5.67889510e-05,1.10487202e-02,2.26103784e-05,2.05891848e-01
    ,5.62123060e-01,2.59875424e-06,2.17156555e-03,7.46910796e-02
    ,4.06487240e-03,1.39925361e-01];
    
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
        
        
    