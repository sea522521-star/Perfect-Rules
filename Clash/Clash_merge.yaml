# ============================================================
# 阿尔忒弥斯实验室 · Clash 完美分流 3.0
#
# 面向 Clash Verge / Mihomo
# 支持 Fake-IP、TUN、IPv6 防泄漏及多场景规则分流。
#
# 使用：
# Clash Verge → 订阅 → 全局扩展覆写配置
# 将本文件完整粘贴后保存即可。
#
# Rule Provider 每 24 小时自动更新。
#
# 【干净版说明】本版已移除被 Clash Verge 应用接管的字段，消除右上角橙色警告：
#   已删除整个 tun 段（tun.enable / stack / dns-hijack / strict-route 等）
#   已删除顶层 ipv6 字段
#   这些功能请在 Verge 「设置」UI 里开启（如「虚拟网卡模式」开关），效果不变。
#   其余 sniff / dns / geox-url / profile / log-level / rules / rule-providers /
#   proxy-groups 全部保留，功能与终版完全一致。
#
# 【终版合并说明】全部增强项（延续自终版）：
#  1. log-level: info            便于内核日志排查命中规则
#  2. global-client-fingerprint  统一 TLS 指纹，握手更稳
#  3. geox-url 镜像源            让 geo 自动更新国内真正跑得动
#  4. sniff.force-dns-mapping    保证 TUN+fake-ip 下直连规则命中
#  5. profile 持久化             重启记住自选节点 + fake-ip 映射
#  6. DNS listen 收 127.0.0.1    不再对局域网开放 DNS
#  7. proxy-server-nameserver 双上游  防节点域名解析单点瘫痪
#  8. 测活地址换 gstatic         防 Cloudflare 探测超时误判节点不可用
#  9. rule-providers 换 testingcf 镜像  防 jsdelivr 抽风致分流失灵
# 10. fake-ip-filter 与新站点同步 并清理 qytk.com
# ============================================================


# ============================================================
# 核心网络设置
# ============================================================

# 内核日志级别：出问题时在 Verge 内核日志里能看到命中了哪条规则
log-level: info

# 统一出站 TLS 客户端指纹，避免裸指纹被中间设备干扰导致握手超时
global-client-fingerprint: chrome

# TCP 并发 + 统一延迟统计：多 IP 域名握手更快、测速更准
tcp-concurrent: true
unified-delay: true

# GEOIP / GEOSITE 数据库：启用 mmdb 模式并每 48 小时自动更新
# （底部 CN 兜底直连依赖它；不更新会导致大量国内站漏判走代理）
geodata-mode: true
geo-auto-update: true
geo-update-interval: 48

# 地理数据库下载地址：默认源在 raw.githubusercontent.com，国内基本连不上，
# 会导致 geo-auto-update 静默失败。这里换成 testingcf 镜像，自动更新才真正生效。
geox-url:
  geoip: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip-lite.dat"
  geosite: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"
  mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country-lite.mmdb"
  asn: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"

# 配置持久化：重启 Clash 后记住上次手动选的节点组，并保留 fake-ip 映射表
# （避免重启后节点归零、首包要重新解析一遍的抖动）
profile:
  store-selections: true
  store-fake-ip: true

# 域名嗅探：Fake-IP + TUN 下客户端常直接按 fake-ip 发包，
# 靠 sniff 从 TLS SNI 还原真实域名，才能保证上面的 DOMAIN 直连规则命中
sniff:
  enable: true
  overwrite-dns: true
  sniff-tls-sni: true
  force-dns-mapping: true


# ============================================================
# DNS
# ============================================================

dns:
  enable: true

  # DNS 服务监听：TUN 靠 dns-hijack 接管，无需对局域网开放，收为本机回环
  listen: 127.0.0.1:1053

  # 禁止返回 IPv6 DNS 记录
  ipv6: false

  # Fake-IP
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16

  # Fake-IP 黑名单
  fake-ip-filter-mode: blacklist
  fake-ip-filter:
    - '*.lan'
    # ---- 系统/本地域名放行，避免误判与 fake-ip 抖动 ----
    - '+.local'
    - '+.localhost'
    - '+.msftconnecttest.com'
    - '+.msftncsi.com'
    - 'time.*.com'
    - 'ntp.*.com'
    - '+.pool.ntp.org'
    # ---- 直连大站放行：让客户端直接拿真实 IP，减少 fake-ip 抖动 ----
    # 注：lanmeiju 暂按 .com 对齐，待你从「连接」面板确认真实后缀后再调
    - '+.lanmeiju.com'
    - '+.bilibili.com'
    - '+.hdslb.com'
    - '+.bilivideo.com'
    - '+.biliimg.com'
    - '+.biliapi.net'
    - '+.youku.com'
    - '+.cibntv.net'
    - '+.ykimg.com'
    - '+.iqiyi.com'
    - '+.qy.net'
    - '+.iqiyipic.com'
    - '+.mgtv.com'
    - '+.wasu.tv'
    - '+.sohu.com'
    - '+.v.qq.com'
    - '+.qq.com'
    - '+.gtimg.cn'
    - '+.gtimg.com'
    # ---- 短视频 / 其它国内视频站（与 rules 直连块同步）----
    - '+.douyin.com'
    - '+.snssdk.com'
    - '+.pstatp.com'
    - '+.ixigua.com'
    - '+.kuaishou.com'
    - '+.gifshow.com'
    - '+.miguvideo.com'
    - '+.migu.cn'
    - '+.1905.com'

  # DNS 上游
  nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query

  # 解析 DNS 服务器自身
  default-nameserver:
    - 223.5.5.5
    - 223.6.6.6

  # 代理节点域名解析：双上游，防单点抽风导致所有节点域名解析不出、整条代理瘫
  proxy-server-nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query


# ============================================================
# Rule Providers
# ============================================================
# 说明：原 url 走 cdn.jsdelivr.net，国内时好时坏，一旦拉取失败会导致
# 整条 RULE-SET 失效（表现为某天广告拦不住 / AI 不分流）。统一换 testingcf 镜像。

rule-providers:

  ads:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/ads.yaml"

  ai:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/ai.yaml"

  youtube:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/youtube.yaml"

  crypto:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/crypto.yaml"

  disney:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/disney.yaml"

  apple:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/apple.yaml"

  google:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/google.yaml"

  software:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: "https://testingcf.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/rules/software.yaml"


# ============================================================
# Proxy Groups
# ============================================================

proxy-groups:

  # ---------- 用户自选组 ----------

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

  - name: "🤖 AI服务 [自选]"
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
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇭🇰 香港节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

  - name: "🍎 苹果服务 [自选]"
    type: select
    proxies:
      - "🇭🇰 香港节点 [系统]"
      - "🇯🇵 日本节点 [系统]"
      - "🇸🇬 新加坡节点 [系统]"
      - "🇺🇸 美国节点 [系统]"
      - "🇹🇼 台湾节点 [系统]"
      - "🌍 其他地区 [系统]"
      - "🌐 全部节点 [系统]"
      - DIRECT

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


  # ---------- 系统组 ----------

  - name: "🌐 全部节点 [系统]"
    type: select
    include-all-proxies: true
    exclude-type: "Direct"

  - name: "♻️ 自动选择 [系统]"
    type: url-test
    include-all-proxies: true
    exclude-type: "Direct"
    exclude-filter: "(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website"
    url: "http://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    lazy: true


  # ==========================================================
  # 地区节点
  # ==========================================================

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


  # ==========================================================
  # 其他地区
  #
  # 除香港 / 日本 / 新加坡 / 美国 / 台湾之外，
  # 其它所有代理节点自动进入此组。
  #
  # 这样无论机场出现德国、加拿大、英国、越南、印度，
  # 还是未来出现法国、荷兰、澳大利亚、巴西等节点，
  # 都不需要再次修改配置。
  # ==========================================================

  - name: "🌍 其他地区 [系统]"
    type: select
    include-all-proxies: true
    filter: '(?i)^(?!.*(?:🇭🇰|🇯🇵|🇸🇬|🇺🇸|🇹🇼|香港|日本|新加坡|美国|台湾|\bHK\b|\bHKG\b|\bJP\b|\bJPN\b|\bSG\b|\bSGP\b|\bUS\b|\bUSA\b|\bTW\b|\bTWN\b|Hong[ -]?Kong|Japan|Tokyo|Osaka|Singapore|United[ -]?States|America|Los[ -]?Angeles|New[ -]?York|San[ -]?Francisco|Taiwan|Taipei)).*'
    exclude-filter: '(?i)官网|流量|剩余|到期|过期|套餐|订阅|重置|traffic|expire|expired|subscription|reset|official|website'
    exclude-type: "Direct"


  # ---------- 广告拦截 ----------

  - name: "🛑 广告拦截 [系统]"
    type: select
    proxies:
      - REJECT
      - DIRECT


# ============================================================
# Rules
# ============================================================

rules:

  # ===== 自定义强制直连（务必保持在 rules 最顶部）=====
  # 关键字 lanmeiju：凡域名含 lanmeiju 一律直连不走代理
  - "DOMAIN-KEYWORD,lanmeiju,DIRECT"
  - "DOMAIN-SUFFIX,lanmeiju.com,DIRECT"

  # ---- 国内视频站：主域名（按实际域名增删）----
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

  # ---- 视频站 CDN / 边缘域名（播放卡顿的真正原因，务必一起直连）----
  - "DOMAIN-SUFFIX,hdslb.com,DIRECT"          # B站图片/视频 CDN
  - "DOMAIN-SUFFIX,bilivideo.com,DIRECT"      # B站视频流
  - "DOMAIN-SUFFIX,bilivideo.cn,DIRECT"
  - "DOMAIN-SUFFIX,cibntv.net,DIRECT"         # 优酷/阿里系 CDN
  - "DOMAIN-SUFFIX,alicdn.com,DIRECT"         # 阿里系 CDN
  - "DOMAIN-SUFFIX,gslb.com,DIRECT"           # 爱奇艺 CDN
  - "DOMAIN-SUFFIX,wasu.tv,DIRECT"            # 芒果TV CDN
  - "DOMAIN-SUFFIX,cdnmango.com,DIRECT"
  - "DOMAIN-SUFFIX,sandai.net,DIRECT"         # 搜狐视频 CDN
  - "DOMAIN-SUFFIX,qpic.cn,DIRECT"            # 腾讯视频图片 CDN
  - "DOMAIN-SUFFIX,gtimg.cn,DIRECT"           # 腾讯 CDN
  - "DOMAIN-SUFFIX,gtimg.com,DIRECT"          # 腾讯 CDN(.com)
  - "DOMAIN-SUFFIX,myqcloud.com,DIRECT"       # 腾讯云 COS/视频
  - "DOMAIN-SUFFIX,qq.com,DIRECT"             # 腾讯视频/QQ音乐等
  - "DOMAIN-SUFFIX,qy.net,DIRECT"             # 爱奇艺视频流(真实CDN)
  - "DOMAIN-SUFFIX,iqiyipic.com,DIRECT"       # 爱奇艺图片
  - "DOMAIN-SUFFIX,ykimg.com,DIRECT"          # 优酷图片
  - "DOMAIN-SUFFIX,biliimg.com,DIRECT"        # B站图床
  - "DOMAIN-SUFFIX,biliapi.net,DIRECT"        # B站API
  - "DOMAIN-SUFFIX,bilibili.cn,DIRECT"

  # ---- 短视频 / 其它国内视频站（按需增删）----
  - "DOMAIN-SUFFIX,douyin.com,DIRECT"
  - "DOMAIN-SUFFIX,snssdk.com,DIRECT"         # 抖音/头条系
  - "DOMAIN-SUFFIX,pstatp.com,DIRECT"         # 抖音静态
  - "DOMAIN-SUFFIX,ixigua.com,DIRECT"         # 西瓜视频
  - "DOMAIN-SUFFIX,kuaishou.com,DIRECT"       # 快手
  - "DOMAIN-SUFFIX,gifshow.com,DIRECT"        # 快手CDN
  - "DOMAIN-SUFFIX,miguvideo.com,DIRECT"      # 咪咕视频
  - "DOMAIN-SUFFIX,migu.cn,DIRECT"
  - "DOMAIN-SUFFIX,1905.com,DIRECT"           # 1905电影网
  # =====================================================

  # 软件进程优先
  - "RULE-SET,software,🖥️ 软件分流 [自选]"

  # 私有地址 / 局域网
  - "GEOSITE,private,DIRECT"
  - "GEOIP,private,DIRECT,no-resolve"

  # 广告
  - "RULE-SET,ads,🛑 广告拦截 [系统]"

  # AI
  - "RULE-SET,ai,🤖 AI服务 [自选]"

  # YouTube
  - "RULE-SET,youtube,📺 油管专用 [自选]"

  # 币圈
  - "RULE-SET,crypto,💰 币圈专用 [自选]"

  # 流媒体
  - "RULE-SET,disney,🎬 流媒体 [自选]"
  - "GEOSITE,netflix,🎬 流媒体 [自选]"

  # Apple
  - "RULE-SET,apple,🍎 苹果服务 [自选]"

  # Google
  - "RULE-SET,google,🔍 谷歌服务 [自选]"

  # Telegram
  - "GEOSITE,telegram,💬 电报专用 [自选]"

  # Microsoft
  - "GEOSITE,microsoft,Ⓜ️ 微软服务 [自选]"

  # 中国大陆
  - "GEOSITE,CN,DIRECT"
  - "GEOIP,CN,DIRECT,no-resolve"

  # 其他流量
  - "MATCH,🚀 默认代理 [自选]"
