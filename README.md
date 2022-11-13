## 系统需求

* 磁盘空间：`8GB+`
* **可用**内存：`4GB+`
* 性能芯片：(可选) `GPU with CUDA`

## 安装与运行

已在 `Debian 11` 上运行通过。

### hanlp 服务器

```bash
cd /work/yunzai-hanlp/py-server
env python3 -m venv .rt # 建议使用分离的环境
source .rt/bin/activate
pip3 install -r requirements.txt --no-cache-dir # 小内存安装 torch 时禁用缓存
```
使用 `screen`、`nohup`、`crontab`、`systemd` 等工具后台启动服务器

### Yunzai-Bot v3 插件

```bash
cd /work/Yunzai-Bot
npm stop # 插件变动需要冷启动
mv /work/yunzai-hanlp/node-client ./plugins/hanlp
npm start
npm run log
```
## 输出格式

修改 `.rt/lib/python3.9/site-packages/hanlp_common/document.py` 中函数 `to_pretty` 下的 `if html:` 节，以自行设置输出数据的样式。修改字体时要预先确定执行环境已安装了对应字体。

