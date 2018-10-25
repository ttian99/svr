# svr
a simple server for mini games.


## 生成https的证书
- [参考](https://www.jianshu.com/p/6406584ef018)
- 构建私钥(private.pem)
```bash
# 导出为当前路径
openssl genrsa -out private.pem 1024
```
- 生成证书请求文件(csr文件)
```bash
openssl req -new -key private.pem -out csr.pem  -subj 
"/C=CN/ST=Guangdong/L=Shenzhen/O=R2Games/OU=H5Group/CN=Monkey.Jiao" 
```
- 自签发证书文件(cer文件)
```bash
openssl x509 -req -days 365 -sha1 -extensions v3_ca -signkey private.pem -in csr.pem -out ca.cer
```