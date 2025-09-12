use chrono::{Datelike, Local};
use log::info;
use tauri::{
    menu::{
        AboutMetadata, Menu, MenuBuilder, MenuItem, PredefinedMenuItem, Submenu, SubmenuBuilder,
    },
    AppHandle, Runtime,
};

use crate::constants::OS_LANGUAGE;
use crate::types::menu::{App, Edit, Help, MenuTranslations};

pub fn build_menu<R: Runtime>(app: &AppHandle<R>) -> Menu<R> {
    info!("Building application menu");

    let menu = load_translation(&OS_LANGUAGE).unwrap_or_default();
    info!("Loaded menu translations: {menu:?}");

    let app_menu = app_submenu(app, &menu.app);
    let edit_menu = edit_submenu(app, &menu.edit);
    let help_menu = help_submenu(app, &menu.help);

    MenuBuilder::new(app)
        .items(&[&app_menu, &edit_menu, &help_menu])
        .build()
        .unwrap()
}

fn load_translation(lang: &str) -> Result<MenuTranslations, String> {
    const MENU_JA: &str = include_str!("../../../../locales/ja/menu.json");
    const MENU_EN: &str = include_str!("../../../../locales/en/menu.json");

    let translations_data = match lang {
        "ja" => MENU_JA,
        "en" => MENU_EN,
        _ => {
            info!("Unsupported language '{lang}', defaulting to English");
            MENU_EN
        }
    };

    let menu: MenuTranslations = serde_json::from_str(translations_data)
        .map_err(|e| format!("Failed to parse menu JSON: {e}"))?;
    Ok(menu)
}

fn app_submenu<R: Runtime>(app: &AppHandle<R>, menu: &App) -> Submenu<R> {
    let about = PredefinedMenuItem::about(
        app,
        Some(&menu.app_submenu.about),
        Some(AboutMetadata {
            name: Some(menu.title.clone()),
            version: Some(app.package_info().version.to_string()),
            copyright: Some(format!(
                "© {} {}",
                Local::now().year(),
                std::env::var("MY_NAME").unwrap_or_default()
            )),
            ..Default::default()
        }),
    )
    .unwrap();
    let quit = MenuItem::with_id(app, "quit", &menu.app_submenu.quit, true, None::<&str>).unwrap();

    Submenu::with_items(
        app,
        menu.title.clone(),
        true,
        &[&about, &PredefinedMenuItem::separator(app).unwrap(), &quit],
    )
    .unwrap()
}

fn edit_submenu<R: Runtime>(app: &AppHandle<R>, menu: &Edit) -> Submenu<R> {
    SubmenuBuilder::new(app, &menu.title)
        .undo_with_text(&menu.edit_submenu.undo)
        .redo_with_text(&menu.edit_submenu.redo)
        .separator()
        .cut_with_text(&menu.edit_submenu.cut)
        .copy_with_text(&menu.edit_submenu.copy)
        .paste_with_text(&menu.edit_submenu.paste)
        .select_all_with_text(&menu.edit_submenu.select_all)
        .build()
        .unwrap()
}

fn help_submenu<R: Runtime>(app: &AppHandle<R>, menu: &Help) -> Submenu<R> {
    let help = MenuItem::with_id(app, "help", &menu.help_submenu.help, true, None::<&str>).unwrap();
    let license = MenuItem::with_id(
        app,
        "license",
        &menu.help_submenu.license,
        true,
        None::<&str>,
    )
    .unwrap();

    Submenu::with_items(app, &menu.title, true, &[&help, &license]).unwrap()
}
