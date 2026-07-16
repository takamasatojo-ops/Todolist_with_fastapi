# TODOリスト（作成中）

ブラウザ上で使用するTODOリストです。

## ディレクトリ構成

```text
To-do-list/
  docker-compose.yaml           Docker Compose起動のためのyamlファイル
  backend/                      API、DB操作のフォルダ
    Dockerfile                  backendのDockerイメージ作成用ファイル
    poetry.lock                 依存ライブラリと具体的なバージョンを固定するファイル
    pyproject.toml              python依存関係を記載。適用したいライブラリが記載されたファイル
    .env.example                .envファイル記載例
    api/
      db.py                     DBの情報へアクセス
      main.py                   実行
      migrate_db.py             DBにテーブル作成
      cruds/                    テーブル操作
      models/                   テーブルにある変数を定義
      routers/                  フロントからの窓口
      schemas/                  変数の型検証
  frontend/                     UIの管理
    Dockerfile                  frontendのDockerイメージ作成用ファイル
    package.json                Node.jsプロジェクトの設計図となるメタデータファイル
    .env.local.example          .env.localファイルの記載例
    tsconfig.json               TypeScriptのコンパイル設定、型チェック設定のためのファイル
    pnpm-lock.yaml              pnpmにおいて、依存関係や正確なバージョンを記録するためのファイル
    next.config.ts              Next.jsのビルドや動作設定を管理するファイル
    eslint.config.mjs           TypeScriptなどのコードを解析し、バグなどを検出するためのもの
    src/
      app/                      UI管理本体
      components/               UI構成要素を担当
      hooks/                    UIを動かすロジック
      types/                    型定義
```

## 使用技術
- python 3.11
- poetry
- sqlalchemy
- pydantic
- FastAPI
- Next.js
- node
- pnpm
- mysql:8.0
- TypeScript
- Docker/Docker Compose

## 立ち上げ

- ローカルのPCにコピーした後、以下の場所にenvファイル等を配置します。.envについては、.env.exampleを参考に、.env.localについては、.env.local.exampleを参考に作成します。

```text
To-do-list/
  backend/    ←  .envを配置
  frontend/   ←  .env.localを配置
```

- Docker Composeを起動します。起動後には以下の３つのコンテナが立ち上がります。
  - backend
  - frontend
  - mysql

- 初回起動時の操作です。Dockerイメージのビルドを行う必要があります。その後、データベースにテーブルを作成します。
```bash
# Dockerイメージのビルドを行い、Docker Compose起動
docker compose up --build
# backendのDockerに入る(別ターミナルで実行)
docker compose exec backend bash
# backendのDocker内に入ったら、以下のコマンドを実行して、テーブル作成
poetry run python -m api.migrate_db
```

- 通常時は以下のコマンドで、Docker Composeを起動します。
```bash
docker compose up
```

- バックグラウンドで立ち上げる場合です。
```bash
docker compose up -d
```

## Todoリスト起動
- .env.localに記載したURLにアクセスします。初回起動時は何も予定が入っていない状態になっています。

## 予定を追加
1. 年/月/日の欄をクリックするとカレンダーが表示されます。タスクを終えたい日を選びます。
2. 次に「新しいタスクを入力」の欄にタスクを入力します。
3. 「タスクの内容」の欄にタスクの内容や補足説明を入力します。（空欄でも構いません）
4. 「追加」ボタンを押下すると下に予定が追加されます。

## その他機能
- 左側の「≡」を上下にドラッグすることで、タスクの入れ替えができます。
- 予定が完了したら、チェックボタンを押下します。すぐ右の「未完了」が「完了✅」に変わります。
- 「内容編集」をクリックすると、タスクの中身（日付、タスク、タスク内容）を変更できます。
- 「タスク削除」をクリックすると、該当タスクを削除できます。
- 「タスクを日付順に入れ替える」をクリックすることで、タスクが日付順（一番下が最も後の日付）になります。

## 操作終了後について
- 以下のコマンドを実行して、コンテナを停止します。（DBの中身は維持されます）
```bash
docker compose down
```