from download import download
from bs4 import BeautifulSoup
from requests.compat import urlparse
from xml.etree import ElementTree
import numpy
from selenium import webdriver
import time
import re
import os
import random


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


def youtube(url):
    seed = 'https://www.youtube.com' + url + '&app=desktop'
    n = 1
    netloc = "www.youtube.com"
    path = ["/watch"]
    param = []
    seed_list = []
    bj = []
    title = []
    temp_path_param = []
    temp_param = "&app=desktop"
    p = re.compile("[0-9\:\,]+\\n[ㄱ-ㅎㅏ-ㅣ가-힣0-9\,\'A-Za-z\s]+[ㄱ-ㅎㅏ-ㅣ가-힣]")
    text_temp = []
    path_temp = '/Users/user/Downloads/'
    driver = webdriver.Chrome()
    q = -1
    break_key = 0
    sub_index = 0

    param.append('?' + seed.split('/')[3].split('?')[1])  # 시작 seed 주소의 parameter

    for c in range(n):
        i = c - sub_index
        print(i)
        break_key = 0

        html = download("get", seed)
        dom = BeautifulSoup(html.text, "lxml")

        print("seed : " + seed)
        url = seed
        seed_list.append(seed)

        try:
            bj.append([_.text for _ in dom.select("div.yt-user-info > a")][0])
            title.append([_.text for _ in dom.select("#eow-title")][0])

        except IndexError:  # 영상이 차단된 경우
            break_key = 1
            seed = seed_list[-2]
            sub_index += 2
            continue

        temp_path_param.append(
            [_['href'] for _ in dom.select(".content-link.spf-link.yt-uix-sessionlink.spf-link")][random.randint(0, 3)])

        path.append(temp_path_param[i].split("?")[0])
        param.append("?" + temp_path_param[i].split("?")[1] + temp_param)

        seed = "https://" + netloc + path[i + 1] + param[i + 1]

        driver.get("https://savesubs.com/")
        driver.find_element_by_css_selector(".search_wrap > div").click()
        driver.find_element_by_name("url").send_keys(url)
        driver.find_element_by_css_selector(".search_wrap > input").click()
        time.sleep(15)
        try:
            for k in driver.find_elements_by_css_selector(".list-reset > li"):
                if (k.find_elements_by_css_selector("span")[0].text == "SRT") & (
                        (k.find_elements_by_css_selector("span")[1].text == "KOREAN (AUTO-GENERATED)") | (
                        k.find_elements_by_css_selector("span")[1].text == "KOREAN")):
                    k.find_element_by_css_selector("a").click()
                    break
            else:
                break_key = 1

        except IndexError:  # 자막이 없는 경우
            break_key = 1
            continue

        if break_key:
            time.sleep(5)
            continue

        time.sleep(15)

        q += 1

        temp = []

        for r, d, f in os.walk('/Users/user/Downloads/'):
            temp.append(f)
            # 파일을 다운로드 받는 default 경로가 /Users/user/Downloads/ 이고,
            # Downloads 폴더 안에 어떠한 파일도 없어야 함

        print(temp)
        if temp[0][1] == "desktop.ini":
            filepath = path_temp + temp[0][0]
        else:
            filepath = path_temp + temp[0][1]
        print(filepath)
        f = open(filepath, encoding='UTF8')
        text = p.findall(f.read())
        f.close()
        os.remove(filepath)
        text_temp.append(text)

        temp1 = []
        temp2 = []

        for _ in text_temp[q]:
            temp1.extend(re.findall(r'(.+?),\d\d\d\n(.+)', _))
        temp2.append(temp1)
        temp1 = []

        return [(temp2[0][x][1], temp2[0][x][0]) for x in range(len(temp2[0]))]
