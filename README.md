# Yo

移动前端CSS Framework

尚在优化中，项目使用碰到问题请及时反馈。

## 如何配置

#### 1. Install gulp globally:

```sh
$ npm install --global gulp
```

#### 2. cd到PC的根目录，Install gulp in your project devDependencies:

```sh
$ npm install --save-dev
```

> 或许你会被告知使用sudo


#### 3. cd到PC的根目录执行gulp的命令：

Tasks 

├── lint   
├─┬ concat  
│ └── lint  
├─┬ minjs  
│ ├── lint  
│ └── concat  
├─┬ js  
│ ├── lint  
│ ├── concat  
│ └── minjs  
├── sass     
├── clean    
├─┬ default  
│ └── clean  
└── watch  