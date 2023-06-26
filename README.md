# Mikrotik-CN

## 📥 下载链接
|   📦 项目    | 📃 文件  |                                🐙 GitHub RAW                                |                               🚀 CDN 加速                               |
|:----------:|:------:|:---------------------------------------------------------------------------:|:---------------------------------------------------------------------:|
| IP-CIDR 列表 | cn.txt | [点我下载](https://raw.githubusercontent.com/kz0612/Mikrotik-CN/release/cn.txt) | [点我起飞](https://cdn.jsdelivr.net/gh/kz0612/Mikrotik-CN@release/cn.txt) |

## 📲️ ROS 脚本

```
# Download and name as "CN"
/tool fetch url=https://raw.githubusercontent.com/kz0612/Mikrotik-CN/release/cn.txt dst-path=CN

# Disable system logging
/system logging disable 0

# Import file
/import file-name=CN

# Add intranet address
/ip firewall address-list add address=10.0.0.0/8 list=CN
/ip firewall address-list add address=172.16.0.0/12 list=CN
/ip firewall address-list add address=192.168.0.0/16 list=CN

# Enable system logging
/system logging enable 0

# Remove File
/file remove [find name="CN"]
```