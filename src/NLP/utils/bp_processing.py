from tqdm import tqdm
import numpy as np
import re
from functools import reduce

def bp_tokenize(chat):
    '''
    chat : sequence of chat (String)
    return : byte tokenized 2-dim array
    '''
    encoded = [_.encode('utf-8') for _ in tqdm(chat)]
    bytearr = np.array([list(map(str, _)) for _ in encoded])

    return bytearr


def bpe_to_words(input_numpy):
    '''
    input_tensor : padded 된 1-d input numpy 
    return : 패딩이 섞인 원래 문장
    '''
    text = []
    for tok in input_numpy.tolist():
        if tok == 0:
            text.append(b'0')
        else:
            text.append(bytes.fromhex(hex(int(tok))[-2:]))
        
    text = b''.join(text).decode('utf-8')
    
    
    return reduce(lambda x,y:re.sub(y, y+"__", x), set(re.findall(r'[가-힣]', text)), text)

if __name__ == '__main__':
    print(bp_tokenize(['시발', 'ㅋㅋ', 'ㅅㅂ', 'ㅅ1ㅂ', 'ㅄ']))