# MBA 招生转化决策树系统 - 实现计划

## 系统概述

这不是聊天机器人，而是一个**5级招生转化决策树系统**。

**核心目标**：在5级以内，把用户从模糊兴趣压缩成结构化招生线索。

**转化逻辑**：
```
用户为什么来 → 用户担心什么 → 用户还差什么信息 → 用户愿意怎么被联系 → 表单提交 → Lark跟进
```

## 5级结构

### 第1级：入口分流（10个选项）
1. 判断这个MBA是否适合我的职业目标
2. 确认我的背景是否符合申请资格
3. 了解学历认可与Woolf
4. 计算学费、分期和奖学金
5. 确认我能否边工作边读
6. 准备申请材料
7. 找到合适入学批次和截止日期
8. 给家人/公司一个简单说明
9. 索取手册或课程摘要
10. 我正在对比其他MBA

**作用**：判断用户为什么来

### 第2级：需求诊断（56个组合）

根据第1级选择，进入不同二级选项：

#### A. 职业目标路径（6个选项）
- 我想升职/转管理岗 → `promotion`
- 我想换行业/换职能 → `career-switch`
- 我想补强当前工作的商业语言 → `business-confidence`
- 我想创业或做咨询方向 → `entrepreneurship` / `consulting`
- 我想要支持长期流动性的学历 → `mobility`
- 我不确定，需要顾问帮我匹配 → `needs-advisor`

#### B. 申请资格路径（6个选项）
- 本科，不限专业 → `standard-admission`
- 本科但不是英文授课 → `english-check`
- 3年制大专+商业工作经验 → `rpl-route`
- 7年以上相关商业经验 → `performance-based-admission`
- 12年以上高度相关经验但无本科 → `performance-based-admission`
- 不确定我的背景怎么算 → `needs-review`

**注意**：不要承诺"你一定可以申请"，只能说"较可能符合标准路径"或"建议招生顾问审核"

#### C. 学历认可路径（6个选项）
- Woolf是否是受认可的高等教育机构？
- 这个学位能否在美国/加拿大做学历评估？
- ECTS、EQF、Europass是什么？
- 雇主是否容易理解这个MBA？
- 是否有助于继续深造或职业流动？
- 我需要给家人/公司一份谨慎说明

**标签**：`recognition-concern`, `woolf-question`, `credential-evaluation`, `employer-concern`, `family-decision`

**注意**：高敏感路径，文案必须谨慎
- ❌ 不能写："全球保证认可"、"移民一定有用"、"雇主一定承认"
- ✅ 应该写："可用于学历评估咨询"、"具体认可取决于机构、雇主或评估部门"

#### D. 费用路径（6个选项）
- 只想知道总学费标准
- 4期付款
- 月付方式
- 奖学金可能性与类别
- 可选新加坡研学周费用
- 需要给家人/公司一份费用说明

**标签**：`fee-sensitive`, `instalment-interest`, `monthly-payment`, `scholarship-interest`, `residency-interest`

**注意**：费用路径很容易转化，线索分数应该比普通brochure request高

#### E. 学习安排路径（6个选项）
- 我全职工作，需要灵活
- 我有家庭责任
- 我担心考试
- 我想尽快完成
- 我需要较慢的24个月计划
- 我希望有互动直播，不是纯自学

**标签**：`working-professional`, `family-responsibility`, `no-exam-concern`, `fast-track`, `flexible-pace`, `live-session-interest`

#### F. 申请材料路径（5个选项）
- 学位、成绩单、简历、护照基本齐了 → **Hot Lead**
- 有学位/成绩单，但简历需要整理
- 可能需要英文测试或入学英文测试
- 需要确认材料是否可接受
- 目前只是先收集信息

**标签**：`application-ready`, `resume-help`, `english-test-needed`, `document-review`, `early-stage`

#### G. 入学批次路径（5个选项）
- 2026年7月入学 → `july-intake`
- 2026年10月入学 → `october-intake`
- 最快可入学批次 → `urgent-intake`
- 还需要3-6个月准备 → `planning-3-6-months`
- 明年再规划 → `future-intake`

#### H. 家人/公司决策路径（6个选项）
- 他们需要先理解学历认可
- 他们需要完整费用拆分
- 他们需要知道线上MBA是否靠谱
- 他们需要职业价值/ROI说明
- 公司可能会赞助或报销
- 我需要中文说明

**标签**：`family-decision`, `company-sponsorship`, `recognition-concern`, `roi-concern`, `needs-chinese`

**注意**：这类用户不一定低意向，很多是高意向但不是一个人能做决定

#### I. 手册/摘要路径（5个选项）
- 发送完整手册
- 发送一页课程摘要
- 发送学费与奖学金说明
- 发送学历认可说明
- 发送申请材料清单

**标签**：`brochure-request`, `one-page-summary`, `fee-sheet-request`, `recognition-sheet-request`, `checklist-request`

**注意**：低门槛留资入口

#### J. MBA对比路径（5个选项）
- 按学历认可对比
- 按总费用对比
- 按学习时间对比
- 按申请难度对比
- 按职业结果对比

**标签**：`comparing-mba`, `recognition-concern`, `fee-sensitive`, `study-schedule`, `career-fit`

**注意**：不要攻击其他MBA，文案应该是"我们可以帮你用认可、费用、学习时间、申请路径和职业目标几个维度做清晰对比"

### 第3级：细节采集（10个固定选项）

不管前面走哪条路径，第三层统一进入"细节确认"：

1. 希望招生顾问审核我的背景
2. 希望获得个性化费用/奖学金预估
3. 希望确认最近入学批次和截止日期
4. 希望获得可转发的书面说明
5. 希望申请前先和顾问聊
6. 我想先下载资料
7. 我准备近期申请
8. 我还在对比其他选择
9. 需要有人帮我跟家人/公司解释
10. 需要顾问帮我选择最合适路径

**作用**：从"兴趣"变成"顾问可以跟进的具体任务"

### 第4级：跟进方式（10个固定选项）

1. WhatsApp发送摘要
2. Email发送详情
3. 安排10-15分钟电话
4. 线上咨询
5. 需要中文顾问
6. 需要英文顾问
7. 先发手册，暂时不电话
8. 我准备开始申请
9. 请顾问评估奖学金匹配
10. 请顾问谨慎解释学历认可

**作用**：让用户自己选择被联系的方式，降低抗拒感

### 第5级：表单

**必填字段**：
- 姓名
- 手机/WhatsApp
- Email
- 国家/地区
- 同意招生团队联系

**选填字段**（通过前面选项自动带入）：
- 最高学历
- 工作年限
- 计划入学时间
- 补充说明

**注意**：主表单只显示5个字段，其他信息通过前面选项自动带入

## 线索评分系统

### 评分逻辑

| 行为/选择 | 加分 |
|----------|------|
| 打开助手 | +5 |
| 选择职业目标 | +10 |
| 选择申请资格 | +15 |
| 选择费用 | +12 |
| 选择奖学金 | +15 |
| 选择学历认可 | +12 |
| 选择申请材料 | +18 |
| 选择近期申请 | +24 |
| 选择准备开始申请 | +30 |
| 选择预约电话/线上咨询 | +24 |
| 留下WhatsApp | +20 |
| 提交表单 | +30 |

### 线索等级

- **0-39分**：Cold Lead（初步了解）
- **40-69分**：Warm Lead（中意向）
- **70-100分**：Hot Lead（高意向）

## 用户标签系统

### 1. 意向标签
- `high-intent`
- `application-ready`
- `brochure-request`
- `consultation-request`
- `comparing-mba`

### 2. 顾虑标签
- `recognition-concern`
- `fee-sensitive`
- `english-concern`
- `time-concern`
- `roi-concern`
- `family-decision`

### 3. 背景标签
- `standard-admission`
- `rpl-route`
- `working-professional`
- `career-switch`
- `entrepreneur`
- `management-track`

### 4. 跟进偏好标签
- `whatsapp-preferred`
- `email-preferred`
- `call-request`
- `chinese-advisor`
- `english-advisor`
- `no-call-yet`

### 5. 产品兴趣标签
- `scholarship-interest`
- `residency-interest`
- `flexible-study`
- `no-exam-concern`
- `global-recognition`

### 6. 渠道标签
- `meta-ad`
- `google-search`
- `xiaohongshu`
- `wechat`
- `event-qr`
- `direct`

## Lark Payload 结构

```json
{
  "programme": "Pickering Global Campus MBA",
  "language": "zh",
  "source": "website",
  "utm_source": "meta",
  "utm_campaign": "mba_working_professionals",
  "lead_score": 86,
  "lead_level": "Hot Lead",
  "tags": [
    "fee-sensitive",
    "scholarship-interest",
    "application-ready",
    "whatsapp-preferred"
  ],
  "answers": {
    "intent": "费用、分期和奖学金",
    "background": "本科但不是英文授课",
    "detailNeed": "希望获得个性化费用/奖学金预估",
    "followUp": "WhatsApp发送摘要"
  },
  "contact": {
    "name": "Chen Li",
    "phone": "+65 xxxx xxxx",
    "email": "example@email.com",
    "country": "Singapore",
    "note": "想了解10月入学和奖学金"
  },
  "recommended_advisor_action": "24小时内通过WhatsApp跟进，发送费用拆分和奖学金说明，并邀请预约咨询。",
  "created_at": "2026-05-03T12:00:00+08:00"
}
```

## 顾问分配规则

### Hot Lead（分数≥70）
**条件**：
- 选择"近期申请"
- 选择"开始申请"
- 选择"电话/线上咨询"
- 选择"申请材料基本齐了"

**动作**：
- 立即推送Lark群
- 分配招生顾问
- 30分钟内跟进
- 优先WhatsApp/电话

### Warm Lead（分数40-69）
**条件**：
- 关注费用、奖学金、学历认可
- 选择发送资料
- 尚未明确申请时间

**动作**：
- 24小时内跟进
- 先发送定制资料
- 3天后再次跟进
- 邀请参加线上说明会

### Cold Lead（分数<40）
**条件**：
- 只是下载资料
- 明年再规划
- 不愿电话

**动作**：
- 进入nurture list
- 发送手册
- 7天后轻度跟进
- 加入再营销广告池

## 顾问跟进SOP

### Step 1：查看线索
顾问先看5个东西：
1. Lead Score
2. Main Intent
3. 用户顾虑
4. Follow-up Preference
5. Tags

❌ 不要问："你想了解什么？"（用户已经回答过了）

### Step 2：根据路径发第一句话

**费用路径**：
> 您好，我看到您主要想了解Pickering Global Campus MBA的学费、分期和奖学金安排。我可以先给您整理一份清晰的费用拆分，包括标准学费、申请费、可选研学周费用，以及奖学金类别说明。

**学历认可路径**：
> 您好，我看到您主要关注Woolf MBA的学历认可问题。我可以为您整理一份比较谨慎、适合转发给家人或公司的说明，包含Woolf、MFHEA、ECTS、EQF和学历评估路径。

**申请资格路径**：
> 您好，我看到您想确认自己的背景是否适合申请。您可以先发我最高学历、毕业院校、专业和工作年限，我帮您做一个初步admissions review。

**近期申请路径**：
> 您好，我看到您已经准备近期申请。我可以先帮您核对申请材料：学位证、成绩单、简历、护照、照片，以及是否需要英文成绩或入学英文测试。

### Step 3：第一次跟进目标

- **Hot Lead**：预约咨询/提交材料/确认入学批次
- **Warm Lead**：接收资料/回复学历背景/确认预算
- **Cold Lead**：保存联系方式/加入资料跟进/未来提醒

### Step 4：跟进节奏

| 时间 | 动作 |
|------|------|
| 0-30分钟 | Hot Lead立即联系 |
| 24小时内 | Warm Lead发送定制资料 |
| 3天后 | 未回复用户轻度提醒 |
| 7天后 | 发送deadline/scholarship angle |
| 14天后 | 转入nurture |
| 入学截止前30天 | 重新激活 |
| 入学截止前14天 | 强提醒 |
| 入学截止前7天 | 最后申请提醒 |

## 实现优先级

### Phase 1：核心决策树（本次实现）
- [x] 类型定义
- [ ] 第1级：10个入口选项
- [ ] 第2级：56个组合路径
- [ ] 第3级：10个固定选项
- [ ] 第4级：10个固定选项
- [ ] 第5级：表单
- [ ] 进度条显示
- [ ] 评分系统
- [ ] 标签系统

### Phase 2：数据集成
- [ ] Lark Webhook集成
- [ ] UTM参数捕获
- [ ] localStorage备份
- [ ] 顾问建议生成
- [ ] Payload下载

### Phase 3：优化功能
- [ ] 双语切换
- [ ] 重新开始
- [ ] 返回上一步
- [ ] 摘要预览
- [ ] 数据分析面板

## 关键原则

1. **严格5级**：不能无限聊，最多5级
2. **不是聊天**：是决策树，不是对话
3. **压平分流**：遇到二次分流时，压平到同一级，不开新屏
4. **目标明确**：把用户从模糊兴趣压缩成结构化线索
5. **谨慎文案**：特别是学历认可路径，不能过度承诺
6. **短句引导**：助手内只做短句引导，长文变成"查看详情"、"发送资料"、"顾问解释"
7. **数据驱动**：每个选择都记录、打分、打标签
8. **顾问友好**：生成的线索要让顾问知道怎么跟进

## 下一步

现在开始实现完整的AdmissionsGuide组件，替换现有的ChatAssistant。
