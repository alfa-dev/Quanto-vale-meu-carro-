require 'sinatra'
require 'pathname'

set :root do
  Pathname.new File.realpath(File.join(File.dirname(__FILE__), '..')) << '/app'
end

get '/' do
  erb :index
end