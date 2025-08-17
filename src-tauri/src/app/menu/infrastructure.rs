use tauri::{
    menu::{
        AboutMetadata, Menu, MenuBuilder, MenuItem, PredefinedMenuItem, Submenu, SubmenuBuilder,
    },
    AppHandle, Runtime,
};

pub fn build_menu<R: Runtime>(app: &AppHandle<R>) -> Menu<R> {
    let app_menu = app_submenu(app);
    let edit_menu = edit_submenu(app);
    let help_menu = help_submenu(app);

    MenuBuilder::new(app)
        .items(&[&app_menu, &edit_menu, &help_menu])
        .build()
        .unwrap()
}

fn app_submenu<R: Runtime>(app: &AppHandle<R>) -> Submenu<R> {
    let about = PredefinedMenuItem::about(
        app,
        Some(format!("{}について", app.package_info().name).as_str()),
        Some(AboutMetadata {
            name: Some("サバカン！".to_string()),
            version: Some(app.package_info().version.to_string()),
            copyright: Some(format!(
                "© 2025 {}",
                std::env::var("MY_NAME").unwrap_or_default()
            )),
            ..Default::default()
        }),
    )
    .unwrap();
    let quit = MenuItem::with_id(app, "quit", "終了", true, None::<&str>).unwrap();

    Submenu::with_items(
        app,
        "サバカン！",
        true,
        &[&about, &PredefinedMenuItem::separator(app).unwrap(), &quit],
    )
    .unwrap()
}

fn edit_submenu<R: Runtime>(app: &AppHandle<R>) -> Submenu<R> {
    SubmenuBuilder::new(app, "編集")
        .undo_with_text("取り消す")
        .redo_with_text("やり直す")
        .separator()
        .cut_with_text("カット")
        .copy_with_text("コピー")
        .paste_with_text("ペースト")
        .select_all_with_text("すべてを選択")
        .build()
        .unwrap()
}

fn help_submenu<R: Runtime>(app: &AppHandle<R>) -> Submenu<R> {
    let help = MenuItem::with_id(app, "help", "ヘルプ", true, None::<&str>).unwrap();
    let license = MenuItem::with_id(app, "license", "ライセンス", true, None::<&str>).unwrap();

    Submenu::with_items(app, "ヘルプ", true, &[&help, &license]).unwrap()
}
