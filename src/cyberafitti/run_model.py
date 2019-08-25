from utils.bp_processing import bp_tokenize
from keras.preprocessing.sequence import pad_sequences
import numpy as np
import torch
from attention.attention_model import StructuredSelfAttention
from torch.autograd import Variable
import os
import pickle

class RunAttentionModel(object):
    

    

    def __init__(self, input_text):
        '''
        input_text : 1-d sequence of String, Series 가능
        '''

        # model parameter 
        self._MAX_LEN = 30
        self._VOCAB_SIZE = 260
        self._EMB_DIM = 10

        self.input_text = input_text
        # model load
        self.model = torch.load(os.getcwd()+'/model/self_attention_bp.pt')
        
    def predict(self):
        # bpe preprocessing
        self.tokenized = bp_tokenize(self.input_text)
        # padding preprocessing
        self.input_padded = pad_sequences(self.tokenized, maxlen=self._MAX_LEN)
        # batch size initial
        self.model.batch_size = np.array(self.input_padded).shape[0]
        # hidden state initial
        self.model.hidden_state = self.model.init_hidden()
        input_tensor = Variable(torch.from_numpy(self.input_padded).type(torch.LongTensor))

        self.pred, _ = self.model(input_tensor)
        
        return

    def run_demo(self):
        '''
        데모 실행 시 호출
        return : 1-d numpy array, 유해정도 probabilyty
        '''

        return self.pred.data.numpy()


    def run_bj(self):
        '''
        return : float, bj 유해 비율 
        '''
        bj_count = torch.round(self.pred.type(torch.DoubleTensor).squeeze(1)).sum().data.numpy()
        
        return bj_count / len(self.input_text)


if __name__ == '__main__':
    import run_model
    from attention.attention_model import StructuredSelfAttention
<<<<<<< HEAD
    tmp = run_model.RunAttentionModel(["이 새끼 진짜 진상", '이 샛기 찐상'])

    tmp.predict()

    print(tmp.run_bj())

    print(tmp.run_demo())
=======
    # tmp = run_model.RunAttentionModel("이 새끼 진짜 진상")
    #
    # tmp.predict()
    #
    # print(tmp.run_bj())
    #
    # print(tmp.run_demo())
>>>>>>> ndemo

