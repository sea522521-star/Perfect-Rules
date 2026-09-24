# ============================================================
# 阿尔忒弥斯实验室 · Clash 完美分流 3.0 (V7.5 电脑优化版)
# 面向 Clash Verge / Mihomo / ShellCrash (适用于 Windows / macOS)
# ============================================================

# ============================================================
# 核心网络设置
# ============================================================

log-level: info
global-client-fingerprint: chrome
tcp-concurrent: true
unified-delay: true
keep-alive-interval: 30

geodata-mode: true
geo-auto-update: true
geo-update-interval: 48

# Geo 库镜像（单条 URL 字符串，严禁数组）
geox-url:
  geoip: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip-lite.dat"
  geosite: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"
  mmdb: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country-lite.mmdb"
  asn: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"

profile:
  store-selections: true
  store-fake-ip: true

sniff:
  enable: true
  overwrite-dns: true
  sniff-tls-sni: true
  force-dns-mapping: true
  sniffing:
    - HTTP
    - TLS
    - QUIC

# ============================================================
# DNS 防污染与防泄漏设置
# ============================================================

dns:
  enable: true
  respect-rules: true
  listen: 127.0.0.1:1053
  ipv6: false

  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16

  fake-ip-filter-mode: blacklist
  fake-ip-filter:
    - '*.lan'
    - '+.local'
    - '+.localhost'
    - '+.msftconnecttest.com'
    - '+.msftncsi.com'
    - 'time.*.com'
    - 'ntp.*.com'
    - '+.pool.ntp.org'

  nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query

  default-nameserver:
    - 223.5.5.5
    - 223.6.6.6

  # 安全 10 类海外安全 DNS 解析（不含 crypto，保持红线不动）
  nameserver-policy:
    'geosite:cn':
      - https://doh.pub/dns-query
      - https://dns.alidns.com/dns-query
    '+.lan':
      - 223.5.5.5
      - 223.6.6.6
    '+.localhost':
      - 223.5.5.5
      - 223.6.6.6
    'geosite:google,youtube,openai,anthropic,telegram,twitter,facebook,instagram,netflix,disney':
      - https://8.8.8.8/dns-query
      - https://1.1.1.1/dns-query

  fallback:
    - tls://8.8.8.8
    - tls://1.1.1.1
    - https://dns.google/dns-query
    - https://cloudflare-dns.com/dns-query

  fallback-filter:
    geoip: true
    geoip-code: CN
    domain:
      - '+.google.com'
      - '+.googleapis.com'
      - '+.googleusercontent.com'
      - '+.gstatic.com'
      - '+.youtube.com'
      - '+.ytimg.com'
      - '+.youtube-nocookie.com'
      - '+.openai.com'
      - '+.chatgpt.com'
      - '+.oaistatic.com'
      - '+.oaiusercontent.com'
      - '+.anthropic.com'
      - '+.claude.ai'
      - '+.telegram.org'
      - '+.t.me'
      - '+.facebook.com'
      - '+.instagram.com'
      - '+.twitter.com'
      - '+.x.com'
      - '+.netflix.com'
      - '+.nflxvideo.net'
      - '+.disneyplus.com'
    ipcidr:
      - 240.0.0.0/4
      - 0.0.0.0/32
      - 127.0.0.1/32
      - 100.64.0.0/10

  proxy-server-nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query

# ============================================================
# Rule Providers
# ============================================================

rule-providers:
  ads:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/ads.yaml"
    path: ./rules/ads.yaml

  ai:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/ai.yaml"
    path: ./rules/ai.yaml

  youtube:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/youtube.yaml"
    path: ./rules/youtube.yaml

  crypto:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/crypto.yaml"
    path: ./rules/crypto.yaml

  disney:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/disney.yaml"
    path: ./rules/disney.yaml

  apple:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/apple.yaml"
    path: ./rules/apple.yaml

  google:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/google.yaml"
    path: ./rules/google.yaml

  software:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://fastly.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/software.yaml"
    path: ./rules/software.yaml

# ============================================================
# Proxy Groups
# ============================================================

proxy-groups:
  - name: "🚀 默认代理 [自选]"
    type: select
    proxies:
      - "♻️ 自动选择 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"

  - name: "🤖 Google AI [自选]"
    type: select
    proxies:
      - "🇺🇸 美国节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "🤖 OpenAI AI [自选]"
    type: select
    proxies:
      - "🇺🇸 美国节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "📺 油管专用 [自选]"
    type: select
    proxies:
      - "🇭🇰 香港节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "🎬 流媒体 [自选]"
    type: select
    proxies:
      - "🇺🇸 美国节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "💬 电报专用 [自选]"
    type: select
    proxies:
      - "🇭🇰 香港节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "Ⓜ️ 微软服务 [自选]"
    type: select
    proxies:
      - DIRECT
      - "🚀 默认代理 [自选]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌐 全部节点 [系统]"

  - name: "🍎 苹果服务 [自选]"
    type: select
    proxies:
      - DIRECT
      - "🚀 默认代理 [自选]"
      - "🇭🇰 香港节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌐 全部节点 [系统]"

  - name: "🔍 谷歌服务 [自选]"
    type: select
    proxies:
      - "🇺🇸 美国节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "💰 币圈专用 [自选]"
    type: select
    proxies:
      - "🇭🇰 香港节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "🖥️ 软件分流 [自选]"
    type: select
    proxies:
      - "🚀 默认代理 [自选]"
      - "♻️ 自动选择 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "🌐 全部节点 [系统]"
    type: select
    include-all-proxies: true
    exclude-type: "Direct"

  - name: "♻️ 自动选择 [系统]"
    type: url-test
    include-all-proxies: true
    exclude-type: "Direct"
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true

  - name: "🇭🇰 香港节点 [系统]"
    type: url-test
    include-all-proxies: true
    filter: '(?i)🇭🇰|香港|港|\bHK\b|\bHKG\b|Hong[ -]?Kong'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true

  - name: "🇯🇵 日本节点 [系统]"
    type: url-test
    include-all-proxies: true
    filter: '(?i)🇯🇵|日本|日|\bJP\b|\bJPN\b|Japan|Tokyo|Osaka'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true

  - name: "🇸🇬 新加坡节点 [系统]"
    type: url-test
    include-all-proxies: true
    filter: '(?i)🇸🇬|新加坡|新国|\bSG\b|\bSGP\b|Singapore'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true

  - name: "🇺🇸 美国节点 [系统]"
    type: url-test
    include-all-proxies: true
    filter: '(?i)🇺🇸|美国|美|\bUS\b|\bUSA\b|United[ -]?States|America|Los[ -]?Angeles|New[ -]?York|San[ -]?Francisco'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true

  - name: "🇹🇼 台湾节点 [系统]"
    type: url-test
    include-all-proxies: true
    filter: '(?i)🇹🇼|台湾|台|\bTW\b|\bTWN\b|Taiwan|Taipei'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true

  - name: "🌍 其他地区 [系统]"
    type: select
    include-all-proxies: true
    filter: '(?i)^(?!.*(?:🇭🇰|🇯🇵|🇸🇬|🇺🇸|🇹🇼|香港|日本|新加坡|美国|台湾|\bHK\b|\bHKG\b|\bJP\b|\bJPN\b|\bSG\b|\bSGP\b|\bUS\b|\bUSA\b|\bTW\b|\bTWN\b|Hong[ -]?Kong|Japan|Tokyo|Osaka|Singapore|United[ -]?States|America|Los[ -]?Angeles|New[ -]?York|San[ -]?Francisco|Taiwan|Taipei)).*'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"

  - name: "🛑 广告拦截 [系统]"
    type: select
    proxies:
      - REJECT
      - DIRECT

# ============================================================
# Rules (分流规则)
# ============================================================

rules:
  # ===== 0. 游戏 / 下载软件真实 CDN 直连 (新增 8 条，防跑爆代理流量) =====
  # Steam 下载直连
  - "DOMAIN-SUFFIX,steamserver.net,DIRECT"
  - "DOMAIN-SUFFIX,steamcontent.com,DIRECT"
  # Epic 下载直连
  - "DOMAIN-SUFFIX,epicgames-内部工具1.akamaized.net,DIRECT"
  - "DOMAIN-SUFFIX,epicgames-内部工具2.akamaized.net,DIRECT"
  # EA 下载直连
  - "DOMAIN-SUFFIX,cdn-ptrp.ea.com,DIRECT"
  - "DOMAIN-SUFFIX,origin2-a.akamaihd.net,DIRECT"
  # 暴雪下载直连
  - "DOMAIN-SUFFIX,blzddist1-a.akamaihd.net,DIRECT"
  - "DOMAIN-SUFFIX,dist.blizzard.com,DIRECT"

  # ===== QUIC 降级保险丝 (默认注释态，油管/谷歌卡顿时放开) =====
  # - "AND,((NETWORK,UDP),(DPORT,443)),REJECT"

  # ===== 1. 自定义强制直连 =====
  - "DOMAIN-KEYWORD,lanmeiju,DIRECT"
  - "DOMAIN-SUFFIX,lanmeiju.com,DIRECT"

  # ===== 2. 系统更新 CDN（直连防消耗代理流量）=====
  - "DOMAIN-SUFFIX,swcdn.apple.com,DIRECT"
  - "DOMAIN-SUFFIX,swdist.apple.com,DIRECT"
  - "DOMAIN-SUFFIX,swscan.apple.com,DIRECT"
  - "DOMAIN-SUFFIX,updates-http.cdn-apple.com,DIRECT"
  - "DOMAIN-SUFFIX,dl.delivery.mp.microsoft.com,DIRECT"
  - "DOMAIN-SUFFIX,ts2.microsoft.com,DIRECT"
  - "DOMAIN-SUFFIX,delivery.mp.microsoft.com,DIRECT"

  # ===== 3. 局域网与私有地址直连 =====
  - "GEOSITE,private,DIRECT"
  - "GEOIP,private,DIRECT,no-resolve"

  # ===== 4. 广告拦截 =====
  - "RULE-SET,ads,🛑 广告拦截 [系统]"

  # ===== 5. 高优先级 AI 分流规则 =====
  # 5.1 Google Gemini / AI 特殊精准匹配
  - "DOMAIN-KEYWORD,generativelanguage,🤖 Google AI [自选]"
  - "DOMAIN-SUFFIX,bard.google.com,🤖 Google AI [自选]"
  - "DOMAIN-SUFFIX,gemini.google.com,🤖 Google AI [自选]"
  - "DOMAIN-SUFFIX,generativelanguage.googleapis.com,🤖 Google AI [自选]"
  - "DOMAIN-SUFFIX,aistudio.google.com,🤖 Google AI [自选]"
  - "DOMAIN-SUFFIX,bardai.googleapis.com,🤖 Google AI [自选]"

  # 5.2 OpenAI / Claude / Copilot
  - "DOMAIN-SUFFIX,openai.com,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,oaistatic.com,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,oaiusercontent.com,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,sora.com,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,anthropic.com,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,claude.ai,🤖 OpenAI AI [自选]"
  - "DOMAIN-SUFFIX,copilot.microsoft.com,🤖 OpenAI AI [自选]"

  # 5.3 规则集兜底 AI 站点
  - "RULE-SET,ai,🤖 OpenAI AI [自选]"

  # ===== 6. 虚拟货币 / 币圈分流 =====
  - "DOMAIN-SUFFIX,gemini.com,💰 币圈专用 [自选]"
  - "RULE-SET,crypto,💰 币圈专用 [自选]"

  # ===== 7. 音视频与流媒体 =====
  - "DOMAIN-SUFFIX,youtube.com,📺 油管专用 [自选]"
  - "DOMAIN-SUFFIX,youtu.be,📺 油管专用 [自选]"
  - "DOMAIN-SUFFIX,googlevideo.com,📺 油管专用 [自选]"
  - "RULE-SET,youtube,📺 油管专用 [自选]"
  - "RULE-SET,disney,🎬 流媒体 [自选]"
  - "GEOSITE,netflix,🎬 流媒体 [自选]"

  # ===== 8. 电报 Telegram =====
  - "DOMAIN-SUFFIX,t.me,💬 电报专用 [自选]"
  - "DOMAIN-SUFFIX,telegram.org,💬 电报专用 [自选]"
  - "DOMAIN-SUFFIX,telegram.me,💬 电报专用 [自选]"
  - "DOMAIN-KEYWORD,telegram,💬 电报专用 [自选]"
  - "GEOSITE,telegram,💬 电报专用 [自选]"
  - "GEOIP,telegram,💬 电报专用 [自选],no-resolve"

  # ===== 9. 国内主流视频站与 CDN（强制直连）=====
  - "DOMAIN-SUFFIX,bilibili.com,DIRECT"
  - "DOMAIN-SUFFIX,biligame.com,DIRECT"
  - "DOMAIN-SUFFIX,biliintl.com,DIRECT"
  - "DOMAIN-SUFFIX,acg.tv,DIRECT"
  - "DOMAIN-SUFFIX,youku.com,DIRECT"
  - "DOMAIN-SUFFIX,iqiyi.com,DIRECT"
  - "DOMAIN-SUFFIX,iq.com,DIRECT"
  - "DOMAIN-SUFFIX,mgtv.com,DIRECT"
  - "DOMAIN-SUFFIX,sohu.com,DIRECT"
  - "DOMAIN-SUFFIX,v.qq.com,DIRECT"
  - "DOMAIN-SUFFIX,hdslb.com,DIRECT"
  - "DOMAIN-SUFFIX,bilivideo.com,DIRECT"
  - "DOMAIN-SUFFIX,bilivideo.cn,DIRECT"
  - "DOMAIN-SUFFIX,cibntv.net,DIRECT"
  - "DOMAIN-SUFFIX,alicdn.com,DIRECT"
  - "DOMAIN-SUFFIX,gslb.com,DIRECT"
  - "DOMAIN-SUFFIX,wasu.tv,DIRECT"
  - "DOMAIN-SUFFIX,cdnmango.com,DIRECT"
  - "DOMAIN-SUFFIX,sandai.net,DIRECT"
  - "DOMAIN-SUFFIX,qpic.cn,DIRECT"
  - "DOMAIN-SUFFIX,gtimg.cn,DIRECT"
  - "DOMAIN-SUFFIX,gtimg.com,DIRECT"
  - "DOMAIN-SUFFIX,myqcloud.com,DIRECT"
  - "DOMAIN-SUFFIX,qq.com,DIRECT"
  - "DOMAIN-SUFFIX,qy.net,DIRECT"
  - "DOMAIN-SUFFIX,iqiyipic.com,DIRECT"
  - "DOMAIN-SUFFIX,ykimg.com,DIRECT"
  - "DOMAIN-SUFFIX,biliimg.com,DIRECT"
  - "DOMAIN-SUFFIX,biliapi.net,DIRECT"
  - "DOMAIN-SUFFIX,bilibili.cn,DIRECT"
  - "DOMAIN-SUFFIX,douyin.com,DIRECT"
  - "DOMAIN-SUFFIX,snssdk.com,DIRECT"
  - "DOMAIN-SUFFIX,pstatp.com,DIRECT"
  - "DOMAIN-SUFFIX,ixigua.com,DIRECT"
  - "DOMAIN-SUFFIX,kuaishou.com,DIRECT"
  - "DOMAIN-SUFFIX,gifshow.com,DIRECT"
  - "DOMAIN-SUFFIX,miguvideo.com,DIRECT"
  - "DOMAIN-SUFFIX,migu.cn,DIRECT"
  - "DOMAIN-SUFFIX,1905.com,DIRECT"

  # ===== 10. Steam 社区 / GitHub / 常用软件 =====
  - "DOMAIN-SUFFIX,cm.steampowered.com,DIRECT"
  - "DOMAIN-SUFFIX,steampowered.com,🚀 默认代理 [自选]"
  - "DOMAIN-SUFFIX,steamcommunity.com,🚀 默认代理 [自选]"
  - "DOMAIN-SUFFIX,github.com,🚀 默认代理 [自选]"
  - "DOMAIN-SUFFIX,githubusercontent.com,🚀 默认代理 [自选]"
  - "DOMAIN-SUFFIX,githubassets.com,🚀 默认代理 [自选]"
  - "RULE-SET,software,🖥️ 软件分流 [自选]"

  # ===== 11. 科技巨头服务组 =====
  - "RULE-SET,apple,🍎 苹果服务 [自选]"
  - "RULE-SET,google,🔍 谷歌服务 [自选]"
  - "GEOSITE,microsoft,Ⓜ️ 微软服务 [自选]"

  # ===== 12. 大陆网络兜底（直连）=====
  - "GEOSITE,CN,DIRECT"
  - "GEOIP,CN,DIRECT,no-resolve"

  # ===== 13. 未匹配域名兜底 =====
  - "MATCH,🚀 默认代理 [自选]"
