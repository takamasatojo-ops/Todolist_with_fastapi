# TODOリスト

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
    pnpm-workspace.yaml         pnpm workspaceで、管理するパッケージの範囲を定義するファイル
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
- .env.localに記載したURLにアクセスします。初回起動時は空のカレンダーが表示されます。

## 予定を追加（サイト上部の入力フォームから追加する場合）
1. 年/月/日の欄をクリックするとカレンダーが表示されます。タスクを行う日（締切日でも良い）を選びます。
2. タスク開始時刻、終了時刻を入力します。（空欄でも良い）
3. 次に「新しいタスクを入力」の欄にタスクを入力します。
4. 「タスクの内容」の欄にタスクの内容や補足説明を入力します。（空欄でも構いません）
5. 「複数日指定」の右のチェックボックスにチェックを入れると、タスク開始日と終了日の双方が表示され、複数日に及ぶタスクを記入することができます。
6. 「追加」ボタンを押下すると下に予定が追加されます。
7. 「入力値をリセット」を押下すると、これまで入力したフォームが空欄になります。

## 予定を追加（カレンダーから追加する場合）
1. 予定を追加したい日をクリックします。
2. すると、予定追加フォームが出てきます。その後の操作は先ほどと同じです。
3. 「追加取消」を押下すると、予定追加フォームが消えます。

## リストの機能
- 左側の「≡」を上下にドラッグすることで、タスクの入れ替えができます。
- 予定が完了したら、チェックボタンを押下します。すぐ右の「未完了」が「完了✅」に変わります。
- リストの「修正」をクリックすると、該当タスクの中身（日付、タスク、タスク内容）を確認・変更できます。
- リストの「削除」をクリックすると、該当タスクを削除できます。
- 「タスクリストを日付順に入れ替える」をクリックすることで、タスクリストが日付順（一番下が最も後の日付）になります。

## カレンダーの機能
- タスクをドラッグして、希望の日の上に持ってくると、タスクを行う日を変更できます。
- タスクをリサイズすると、タスクの期間を変更できます（日付のみ）
- タスクをクリックすると、該当タスクの中身（日付、タスク、タスク内容）を確認・変更・削除できます。
- カレンダーの右上の「month」をクリックすると、月表示、「week」をクリックすると週表示になります。
- 「＜」「＞」をクリックすると、前後の月や週へ移動できます。
- 「today」をクリックすると、本日の日付がある月や週に戻ります。

## 操作終了後について
- 以下のコマンドを実行して、コンテナを停止します。（DBの中身は維持されます）
```bash
docker compose down
```