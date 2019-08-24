from download import download
from bs4 import BeautifulSoup
from requests.compat import urlparse
from xml.etree import ElementTree
import numpy
import requests
import re


def afre_chat(url):
    '''
    return chatting log numpy array
    '''

    html = download('get', url)  # 파싱 동영상 url
    dom = BeautifulSoup(html.text, 'lxml')  # dom화
    metatag = dom.select_one("meta[property='og:image']")['content']  # key찾는 과정
    rowKey = urlparse(metatag).query  # key만 가져옴
    key = rowKey[:-1]+'c'  # url 변경
    # xml request
    xml = download('get', 'http://videoimg.afreecatv.com/php/ChatLoad.php', param=key)
    xmltree = ElementTree.XML(xml.text)  # xml tree화

    # nickname / id / chat / time 의 n
    chatdata = numpy.asarray(tuple(zip(map(lambda x: x.text, xmltree.findall('chat/m')),
                                       map(lambda x: x.text,
                                           xmltree.findall('chat/u')),
                                       map(lambda x: x.text, xmltree.findall('chat/t')))))

    return chatdata


def twi_chat(url):
    '''
    트위치 영상 url중 끝 부분을 전달해주면 채팅을 파싱해오는 함수
    :param url: ex) /2633849
    :return:
    '''
    chatdata = []
    url = 'https://api.twitch.tv/v5/videos'+url+'/comments'
    param = {
        'content_offset_seconds':0
    }
    while True:
        res = download('get',url, param=param).json()
        chatdata.extend([(_['message']['body'], _['commenter']['name'], _['content_offset_seconds'])
                         for _ in res['comments']])
        if '_next' not in res.keys():
            break
        param = {
            'cursor':res['_next']
        }
    return chatdata


<<<<<<< HEAD

def youtube_jamak(url_id,lst=None):
    if lst==None:
        lst=[]
    headers={
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
        "x-client-data": "CI62yQEIpbbJAQjEtskBCKmdygEIqKPKAQjiqMoBCJetygEIza3KAQjKr8oB"}
    url_id = re.search(r'v=(.+)', url_id).group(1)
    id=url_id
    base = 'https://www.youtube.com/watch?v=url_id'
    jamak_url_base='https://www.youtube.com/api/timedtext?v=url_id&asr_langs=de%2Cen%2Ces%2Cfr%2Cit%2Cja%2Cko%2Cnl%2Cpt%2Cru&caps=asr&xorp=true&hl=ko&ip=0.0.0.0&ipbits=0&expire=expire&sparams=ip%2Cipbits%2Cexpire%2Cv%2Casr_langs%2Ccaps%2Cxorp&signature=signature&key=yt8&kind=asr&lang=ko&fmt=srv3'
    video_url = base.replace(requests.compat.urlparse(base)[4],'v={}'.format(url_id))
    jamak_url=jamak_url_base.replace(requests.compat.urlparse(jamak_url_base)[4].split('&')[0],'v={}'.format(url_id))
    html = download('get',video_url)
=======
def youtube_jamak(url_id):
    url = "https://www.youtube.com"+url_id
    html = download('get', url)
>>>>>>> 97a360676d4e051f4956750ea83318b4e4ba76fb
    dom = BeautifulSoup(html.text, 'lxml')
    if len([_.text for _ in dom.select('script') if 'captionTracks' in _.text]) <= 0:
        return None
    else:
        target = [_.text for _ in dom.select('script') if 'captionTracks' in _.text][0]
        target = re.sub(r'\\','', target)
        target = re.sub(r'u0026', '&', target)
        capUrl = re.search(r'\{\"captionTracks\":\[\{\"baseUrl\"\:\"(.+)\",\"n',target).group(1)
        capUrl = re.sub(r'&lang=(.+)', '&lang=ko', capUrl)
        cap = download('get', capUrl)
        caption = cap.text
        caption = re.sub(r'&lt;','<',caption)
        caption = re.sub(r'&gt;', '>', caption)
        cDom = BeautifulSoup(caption, 'lxml')
        return [_.text for _ in cDom.select('text')]




