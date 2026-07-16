# TODOリスト（作成中）

ブラウザで使用するTODOリストです。

## ディレクトリ構成

```text
To-do-list/
  docker-compose.yaml           docker-compose起動のためのyamlファイル
  backend/　　　　　　　　　　　　　API、DB操作のフォルダ
    Dockerfile                  backendのドッカーファイル
    poetry.lock　　　　　　　　　　実際に現環境で適用されているライブラリと具体的なバージョンが記載されたファイル
    pyproject.toml              python依存関係を記載。適用したいライブラリが記載されたファイル
    .env.example　　　　　　　　　.envファイル記載例
    api/
      db.py                     DBの情報へアクセス
      main.py                   実行
      migrate_db.py　　　　　　　　DBにテーブル作成
      cruds/                    テーブル操作
      models/                   テーブルにある変数を定義
      routers/                  フロントからの窓口
      schemas/                  変数の型検証
  frontend/                     UIの管理
    Dockerfile                  frontendのドッカーファイル
    package.json                Node.jsプロジェクトの設計図となるメタデータファイル
    .env.local.example          .env.localファイルの記載例
    tsconfig.json               TSファイルをJSファイルにコンパイルするための設定ファイル
    pnpm-lock.yaml              pnpmにおいて、依存関係や正確なバージョンを記録するためのファイル
    next.config.ts              Next.jsの設定を正しい型に合わせて外部に提供するためのテンプレート
    postcss.config.mjs          プラグインを通してCSSを変換、最適化するためのもの
    eslint.config.mjs           TypeScriptなどのコードを解析し、バグなどを検出するためのもの
    src/
      app/　　　　　　　　　　　　　UI管理本体
      components/　　　　　　　　　UI構成要素を担当
      hooks/　　　　　　　　　　　　UIを動かすロジック
      types/　　　　　　　　　　　　型定義
```

## 立ち上げ

まず、ローカルのPCにコピーした後、以下の場所にenvファイル等を配置する

```text
To-do-list/
  backend/    ←　.envを配置
  frontend/　 ←　.env.localを配置
```
.envについては、.env.exampleを参考に
.env.localについては、.env.local.exampleを参考に作成

## docker-compose立ち上げ

```bash
docker-compose up
```

## Todoリスト起動
.env.localに記載したURLにアクセスする。
最初は何も予定が入っていない状態になっている。

## 予定を追加
1. 年/月/日の欄をクリックするとカレンダーが表示される。タスクを終えたい日を選ぶ。
2. 次に「新しいタスクを入力」の欄にタスクを入力
3. 「タスクの内容」の欄にタスクの内容や補足説明を入力（空欄でも構いません）
4. 「追加」ボタンを押下すると下に予定が追加されます。

## その他機能
- 左側の「≡」を上下にドラッグすることで、タスクの入れ替えができます。
- 予定が完了したら、チェックボタンを押下する。すぐ右の「未完了」が「完了✅」に変わる。
- 「内容編集」をクリックすると、タスクの中身（日付、タスク、タスク内容）を変更できます。
- 「タスク削除」をクリックすると、該当タスクを削除できます。
- 「タスクを日付順に入れ替える」をクリックすることで、タスクが日付順（一番下が最も後の日付）になります。



