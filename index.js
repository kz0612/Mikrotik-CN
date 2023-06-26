import * as fs from "fs";
import HttpProxyAgent from "https-proxy-agent";
import fetch from "node-fetch";

const runWithProxy = process.argv.length > 2 && process.argv[2] === "true";
const requestInit = runWithProxy
  ? { agent: new HttpProxyAgent.HttpsProxyAgent("http://127.0.0.1:10809") }
  : undefined;

(async () => {
  // IPv4
  const resp0 = await fetch(
    "https://raw.githubusercontent.com/Hackl0us/GeoIP2-CN/release/CN-ip-cidr.txt",
    requestInit
  );
  const text0 = await resp0.text();
  const lines0 = text0.split("\n");

  const result = [
    "/ip firewall address-list remove [/ip firewall address-list find list=CN]",
    "/ip firewall address-list",
  ];
  lines0.forEach((line) => {
    if (!!line.trim()) {
      result.push(`:do { add address=${line} list=CN } on-error={}`);
    }
  });

  // IPv6
  const resp1 = await fetch("https://www.iwik.org/ipcountry/mikrotik/CN");
  const text1 = await resp1.text();
  const lines1 = text1.split("\n");

  result.push(
    "/ipv6 firewall address-list remove [/ipv6 firewall address-list find list=CN]"
  );
  result.push("/ipv6 firewall address-list");

  lines1.forEach((line) => {
    if (!!line.trim() && line.includes("::")) {
      result.push(line.trim());
    }
  });

  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }
  fs.writeFileSync("dist/cn.txt", result.join("\n"));
})();
