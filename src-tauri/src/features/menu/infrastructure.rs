use tauri::{
    menu::{AboutMetadata, Menu, MenuBuilder, MenuItem, PredefinedMenuItem, Submenu},
    AppHandle, Runtime,
};

pub fn build_menu<R: Runtime>(app: &AppHandle<R>) -> Menu<R> {
    let app_menu = app_submenu(app);
    let help_menu = help_submenu(app);

    MenuBuilder::new(app)
        .items(&[&app_menu, &help_menu])
        .build()
        .unwrap()
}

pub fn about<R: Runtime>(app: &AppHandle<R>) -> PredefinedMenuItem<R> {
    let about_metadata = AboutMetadata {
        name: Some("サバカン！".to_string()),
        version: Some(app.package_info().version.to_string()),
        copyright: Some(format!("© 2025 {}", env!("MY_NAME"))),
        ..Default::default()
    };

    PredefinedMenuItem::about(
        app,
        Some(format!("{}について", app.package_info().name).as_str()),
        Some(about_metadata),
    )
    .unwrap()
}

fn app_submenu<R: Runtime>(app: &AppHandle<R>) -> Submenu<R> {
    let about = about(app);
    let quit = MenuItem::with_id(app, "quit", "終了", true, None::<&str>).unwrap();

    Submenu::with_items(
        app,
        "サバカン！",
        true,
        &[&about, &PredefinedMenuItem::separator(app).unwrap(), &quit],
    )
    .unwrap()
}

fn help_submenu<R: Runtime>(app: &AppHandle<R>) -> Submenu<R> {
    let help = MenuItem::with_id(app, "help", "ヘルプ", true, None::<&str>).unwrap();
    let license = MenuItem::with_id(app, "license", "ライセンス", true, None::<&str>).unwrap();

    Submenu::with_items(app, "ヘルプ", true, &[&help, &license]).unwrap()
}
