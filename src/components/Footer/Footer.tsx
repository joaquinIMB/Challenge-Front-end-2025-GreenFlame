import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F7FB] text-[#06102D] text-sm">
      <div className="bg-[#102C79] text-white py-[44px] px-4">
        <div className="max-w-[1294px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-10 gap-y-10 items-start overflow-hidden">
          <div className="flex flex-col text-left gap-4 w-[319px]">
            <h2 className="font-bold text-lg text-white">
              ¿Quieres estar al tanto de <br /> nuestras novedades?
            </h2>
            <p className="text-sm leading-[24px] text-white">
              Suscríbete a nuestro newsletter y mantente al día con nuestras
              novedades, lanzamientos de productos y ofertas exclusivas.
            </p>
          </div>

          <div>
            <form className="flex justify-end gap-4 items-start w-[932px]">
              <div className="flex flex-col">
                {" "}
                <label
                  htmlFor="name"
                  className="text-sm font-normal text-white mb-2"
                >
                  Nombre
                </label>{" "}
                <input
                  id="name"
                  type="text"
                  className="p-2 rounded-md text-[#8292AA] text-base bg-white w-[358px] font-normal focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                {" "}
                <label
                  htmlFor="email"
                  className="text-sm font-normal text-white mb-2"
                >
                  Dirección de e-mail
                </label>{" "}
                <input
                  id="email"
                  type="email"
                  className="p-2 rounded-md text-[#8292AA] text-base bg-white w-[358px] font-normal focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#3179BD] text-white text-base font-semibold py-2 w-[172px] rounded-md transition-colors leading-normal self-end"
              >
                ¡Suscríbete!
              </button>
            </form>
            <div className="mt-4 flex items-start gap-2 text-xs leading-[20px] text-[#A6B4CF]">
              <input
                type="checkbox"
                className="mt-0.5 accent-[#3179BD] flex-shrink-0"
                id="accept_terms"
              />
              <label htmlFor="accept_terms" className="cursor-pointer">
                Acepto registrarme en la base de datos de Unión de
                Representaciones para recibir información y promociones en esta
                dirección de correo electrónico.
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-[1294px] mx-auto flex justify-between max-h-[201px]">
          <div className="flex flex-col items-start w-[288px]">
            <img
              className="h-auto w-[288px]"
              src="/icons_logos/logo-udr.svg"
              alt="Unión de Representaciones Logo"
            />
            <div className="flex gap-5 mt-6">
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-[#3179BD] text-white flex items-center justify-center p-2"
              >
                <img
                  src="/icons_logos/wpp.svg"
                  alt="WhatsApp"
                  className="h-8 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-[#3179BD] text-white flex items-center justify-center p-2"
              >
                <img
                  src="/icons_logos/ig.svg"
                  alt="Instagram"
                  className="h-8 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-[#3179BD] text-white flex items-center justify-center p-2"
              >
                <img
                  src="/icons_logos/fb.svg"
                  alt="Facebook"
                  className="h-8 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-[#3179BD] text-white flex items-center justify-center p-2"
              >
                <img
                  src="/icons_logos/ld.svg"
                  alt="LinkedIn"
                  className="h-8 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-xl bg-[#3179BD] text-white flex items-center justify-center p-2"
              >
                <img
                  src="/icons_logos/tw.svg"
                  alt="X (Twitter)"
                  className="h-8 w-6"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-start gap-3">
            <h5 className="font-bold text-base mb-3 text-[#3179BD]">
              ¿Necesitas ayuda?
            </h5>
            <ul className="space-y-4 text-[#8292AA] text-sm leading-[20px]">
              <li>union@udr.com.co</li>
              <li>Teléfono: +57 601 589 7880 / 99</li>
              <li>Calle 20 No. 4-55, Piso 3, Bogotá</li>
            </ul>
          </div>

          <div className="flex flex-col justify-start gap-3">
            <h5 className="font-bold text-base mb-3 text-[#3179BD]">
              Instructivos
            </h5>
            <ul className="space-y-4 text-[#8292AA] text-sm leading-[20px]">
              <li>Disney</li>
              <li>Universal</li>
              <li>Avis Budget</li>
              <li>Terracwind</li>
            </ul>
          </div>

          <div className="flex flex-col justify-start gap-3">
            <h5 className="font-bold text-base mb-3 text-[#3179BD]">
              Información
            </h5>
            <ul className="space-y-4 text-[#8292AA] text-sm leading-[20px]">
              <li>Aviso legal</li>
              <li>Políticas de privacidad</li>
              <li>Términos y condiciones</li>
              <li>Ver mis transacciones</li>
            </ul>
          </div>

          <div className="flex flex-col justify-start gap-3">
            <h5 className="font-bold text-base mb-3 text-[#3179BD]">
              Nosotros
            </h5>
            <ul className="space-y-4 text-[#8292AA] text-sm leading-[20px]">
              <li>¿Quiénes somos?</li>
              <li>NIT: 860535628-1</li>
              <li>Registro Nacional de Turismo No. 1041</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-[1294px] border-t border-[#DCE3ED] mx-auto items-center justify-between py-10 ">
        <img
          src="/company_logos/anato-logo.png"
          alt="Anato"
          className="h-8 w-auto"
        />
        <img
          src="/company_logos/camara-colombiana-comercio-logo.png"
          alt="Camara de Comercio Electrónico"
          className="h-8 w-auto"
        />
        <img
          src="/company_logos/superintendencia-logo.png"
          alt="Superintendencia de Industria y Comercio"
          className="h-8 w-auto"
        />
        <img
          src="/company_logos/super-transporte-logo.png"
          alt="SuperTransporte"
          className="h-8 w-auto"
        />
        <img
          src="/company_logos/aeronautica-logo.png"
          alt="Aeronáutica Civil"
          className="h-8 w-auto"
        />
        <img
          src="/icons_logos/iata-logo.svg"
          alt="IATA"
          className="h-8 w-auto"
        />
      </div>

      <div className="flex justify-between items-center w-[1294px] mx-auto text-start text-xs text-[#1E3050] py-8 px-4 border-t-1 border-[#DCE3ED]">
        <div className="">
          © 2025 - Copyright Unión de Representaciones S.A.S. Todos los derechos
          reservados.
        </div>
        <div className="text-xs text-right text-[#1E3050] flex flex-col items-center">
          <p className="text-sm leading-none">Desarrollado por</p>
          <img
            src="/icons_logos/greenFlame-logo.svg"
            alt="GreenFlame Logo"
            className="h-5 w-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
