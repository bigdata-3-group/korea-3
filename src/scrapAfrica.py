from download import download
from bs4 import BeautifulSoup
from requests.compat import urlparse
from xml.etree import ElementTree

def get_chat(url):
    '''
    get chatting log
    return xmltree instance
    '''

    from download import download
    from bs4 import BeautifulSoup
    html = download('get', url) ## 파싱 동영상 url
    dom = BeautifulSoup(html.text, 'lxml') ## dom화
    metatag = dom.select_one("meta[property='og:image']")['content'] ## key찾는 과정
    rowKey = urlparse(metatag).query # key만 가져옴
    key = rowKey[:-1]+'c' ## url 변경
    xml=download('get', 'http://videoimg.afreecatv.com/php/ChatLoad.php', param=key) ## xml request
    xmltree = ElementTree.XML(xml.text) # xml tree화
    return xmltree